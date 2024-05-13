import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Env } from "src/env";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService<Env>) => {
        const privateKeyBase64 = configService.get("JWT_PRIVATE_KEY");
        const publicKeyBase64 = configService.get("JWT_PUBLIC_KEY");

        return {
          privateKey: Buffer.from(privateKeyBase64, "base64"),
          publicKey: Buffer.from(publicKeyBase64, "base64"),
          signOptions: { algorithm: "RS256", expiresIn: "1d" },
        };
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
