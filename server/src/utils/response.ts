import { Response } from "express";

class ResponseBuilder {
  private static instance: ResponseBuilder;

  private constructor() {}

  /**
   * Get the singleton instance of ResponseBuilder.
   */
  public static getInstance(): ResponseBuilder {
    if (!ResponseBuilder.instance) {
      ResponseBuilder.instance = new ResponseBuilder();
    }
    return ResponseBuilder.instance;
  }

  /**
   * Get the appropriate status message based on the HTTP status code.
   *
   * @param code - HTTP status code
   * @returns The corresponding status message
   */
  private getStatusMessage(code: number): string {
    if (code >= 100 && code < 200) return "Informational";
    if (code >= 200 && code < 300) return "Success";
    if (code >= 300 && code < 400) return "Redirection";
    if (code >= 400 && code < 500) return "Client Error";
    if (code >= 500 && code < 600) return "Server Error";
    return "Unknown";
  }

  /**
   * Sends a structured JSON response.
   *
   * @param res - Express response object
   * @param code - HTTP status code
   * @param message - Message to include in the response
   * @param data - Data to include in the response
   */
  public sendResponse(
    res: Response,
    code: number,
    message?: string,
    data?: any,
  ): void {
    const response = {
      code: code,
      status: this.getStatusMessage(code),
      success: code >= 200 && code < 300,
      message: message,
      data: this.formatData(data),
    };

    res.status(code).json(response);
  }

  /**
   * Format data based on the type and structure.
   *
   * @param data - Data to format
   * @returns Formatted data
   */
  private formatData(data: any): any {
    if (data && typeof data === "object" && Object.keys(data).length === 1) {
      const [key] = Object.keys(data);
      return data[key];
    }
    return data;
  }
}

/**
 * Helper function for sending responses.
 *
 * @param res - Express response object
 * @param code - HTTP status code
 * @param message - Message to include in the response
 * @param data - Data to include in the response
 */
export function respond(
  res: Response,
  code: number,
  message?: string,
  data?: any,
): void {
  const responseBuilder = ResponseBuilder.getInstance();
  responseBuilder.sendResponse(res, code, message, data);
}
