/**
 * テーマ管理のコンポーザブル
 * ダークモード/ライトモードの切り替えなどに使用
 */
export const useTheme = () => {
  const isDark = useState<boolean>('theme-dark', () => false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    // ローカルストレージに保存
    if (import.meta.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'default');
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'default');
    }
  };

  const initTheme = () => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      isDark.value = shouldBeDark;
      document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'default');
    }
  };

  if (import.meta.client) {
    onMounted(() => {
      initTheme();
    });
  }

  return {
    isDark: readonly(isDark),
    toggleTheme,
    initTheme,
  };
};
