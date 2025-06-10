import { useEffect, useState } from 'react';

interface VirtualListProps {
  rowHeight: number;
  totalItems: number;
  ref: HTMLDivElement | null;
  containerHeight: number;
}

interface VirtualReturnType {
  start: number;
  end: number;
  getItemStyle: (index: number) => { [key: string]: string | number };
}

export const useVirtualList = (props: VirtualListProps): VirtualReturnType => {
  const { rowHeight, ref, containerHeight, totalItems } = props;
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    if (!ref) return;

    const handleScroll = () => {
      setScrollTop(ref.scrollTop);
    };

    ref.addEventListener('scroll', handleScroll);

    return () => ref.removeEventListener('scroll', handleScroll);
  }, [ref]);

  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = startIndex + Math.ceil(containerHeight / rowHeight);

  return {
    start: startIndex,
    end: Math.min(endIndex, totalItems - 1),
    getItemStyle: (index: number) => ({
      position: 'absolute' as const,
      top: index * rowHeight,
      height: rowHeight,
      width: '100%',
    }),
  };
};
