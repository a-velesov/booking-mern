import { useEffect } from 'react';

export const useClickOutside = (element, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(element.current && !element.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};