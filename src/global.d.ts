declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly JWT_SECRET: string;
    readonly JWT_EXPIRES_IN: string;
  }
}
