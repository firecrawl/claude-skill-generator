export interface FingerprintJSProServerEventResponse {
  requestId: string;
  products?: {
    identification?: {
      data?: {
        visitorId: string;
        // Include other identification fields if needed
      };
    };
    botd?: {
      data: {
        bot: {
          result: "notDetected" | "good" | "bad"; // Adjusted based on common server API types
          type?: string; // Usually present when result is 'bad'
        };
        ip: string;
        time: string; // Consider using Date type if you parse it
        url: string;
        // Add other botd fields if available/needed (e.g., userAgent)
      };
    };
    // Add other potential products if you use them (e.g., vpn, ipBlocklist)
  };
}

export interface SignUpWithFingerprintData {
  fingerprint?: {
    requestId: string;
    visitorId?: string; // Often useful to associate signup with visitor
  };
}
