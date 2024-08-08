export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      type: "SINGLE" | "MARRIED";
      onboardingComplete?: boolean;
    };
  }
}
