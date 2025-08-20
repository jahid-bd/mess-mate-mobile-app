import { API_CONFIG } from './constants';

export const checkNetworkConnectivity = async (): Promise<{
  isConnected: boolean;
  message: string;
  details?: any;
}> => {
  try {
    console.log('🔍 Checking network connectivity...');
    console.log('📍 Target URL:', API_CONFIG.BASE_URL);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signin`, {
      method: 'HEAD', // Just check if server is reachable
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok || response.status === 405) { // 405 = Method Not Allowed is fine for HEAD request
      console.log('✅ Network connectivity: GOOD');
      return {
        isConnected: true,
        message: 'Server is reachable',
        details: { status: response.status, url: API_CONFIG.BASE_URL }
      };
    }
    
    console.log('⚠️ Network connectivity: Server responded with error');
    return {
      isConnected: false,
      message: `Server error: ${response.status}`,
      details: { status: response.status, url: API_CONFIG.BASE_URL }
    };
    
  } catch (error: any) {
    console.error('❌ Network connectivity: FAILED', error);
    
    let message = 'Network connection failed';
    
    if (error.name === 'AbortError') {
      message = 'Connection timeout - Server might be down';
    } else if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
      message = 'Cannot reach server - Check if backend is running and accessible';
    }
    
    return {
      isConnected: false,
      message,
      details: { 
        error: error.message, 
        name: error.name,
        url: API_CONFIG.BASE_URL 
      }
    };
  }
};

export const debugNetworkIssue = async () => {
  console.log('🔧 Starting network debug...');
  console.log('📱 Platform:', process.env.EXPO_PUBLIC_PLATFORM || 'unknown');
  console.log('🌐 API Base URL:', API_CONFIG.BASE_URL);
  console.log('⚙️ Environment Variables:');
  console.log('  - EXPO_PUBLIC_API_BASE_URL:', process.env.EXPO_PUBLIC_API_BASE_URL || 'not set');
  console.log('  - EXPO_PUBLIC_API_BASE_URL_LOCALHOST:', process.env.EXPO_PUBLIC_API_BASE_URL_LOCALHOST || 'not set');
  console.log('  - EXPO_PUBLIC_API_BASE_URL_ANDROID_EMULATOR:', process.env.EXPO_PUBLIC_API_BASE_URL_ANDROID_EMULATOR || 'not set');
  console.log('  - EXPO_PUBLIC_API_BASE_URL_IOS_DEVICE:', process.env.EXPO_PUBLIC_API_BASE_URL_IOS_DEVICE || 'not set');
  
  const result = await checkNetworkConnectivity();
  console.log('🔍 Network Debug Result:', result);
  
  return result;
};
