import { useState } from 'react';

export default () => {
  const [searchKey, setSearchKey] = useState<string>('');
  return { searchKey, setSearchKey };
};
