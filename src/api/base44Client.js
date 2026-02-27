import { appParams } from '@/lib/app-params';

// Mock Base44 client for development
// Replace this with actual Base44 SDK import when available
class Base44Mock {
  constructor(config) {
    this.config = config;
    this.auth = {
      me: async () => {
        // Mock user data
        return {
          id: 'mock-user-id',
          email: 'user@example.com',
          name: 'Mock User'
        };
      },
      logout: (redirectUrl) => {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      },
      redirectToLogin: (fromUrl) => {
        console.log('Redirect to login:', fromUrl);
        // In production, this would redirect to Base44 login
      }
    };
  }
}

export const base44 = new Base44Mock({
  appId: appParams.appId,
  token: appParams.token,
  appBaseUrl: appParams.appBaseUrl,
  functionsVersion: appParams.functionsVersion,
});
