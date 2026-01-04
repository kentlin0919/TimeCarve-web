import { useEffect } from 'react';
import { useSystemStore } from '@/lib/store/systemStore';

export function useSystemModules() {
  const { 
    modules, 
    loading, 
    initialized,
    init,
    getModuleByRoute,
    getModulesByIdentity 
  } = useSystemStore();

  useEffect(() => {
    // Only init if we haven't loaded data yet.
    // The store protects against double-fetching, but we can check initialized here too.
    if (!initialized) {
        init();
    }
  }, [initialized, init]);

  const isModuleEnabled = (key: string) => {
    const module = modules.find((m) => m.key === key);
    return module ? module.is_active : false;
  };

  return {
    modules,
    loading: loading && !initialized, // Only show loading if we really have no data
    isModuleEnabled,
    getModulesByIdentity,
    getModuleByRoute,
  };
}
