import './styleHeader.scss';

import { Input } from '@mantine/core';
import { headerProps } from '@/config/interfaces';

export default function Header({ search, setSearch }: headerProps) {
  return (
    <header className="section-header">
      <h1>Prangati</h1>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
    </header>
  );
}
