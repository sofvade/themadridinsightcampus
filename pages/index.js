import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

export default function Home() {
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => { fetch('/api/universities').then(r=>r.json()).then(setList); }, []);
  const results = useMemo(() => {
    const q = query.toLowerCase();
    return list.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.city.toLowerCase().includes(q) ||
      u.tags.join(' ').toLowerCase().includes(q)
    );
  }, [query, list]);

  const fmt = (n) => (Math.round(n*10)/10).toFixed(1);

  return (
    <div>
      <header style={{position:'sticky', top:0, background:'rgba(255,255,255,0.9)', backdropFilter:'blur(6px)', borderBottom:'1px solid #e5e7eb'}}>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <img src="/logo-campus.png" alt="Logo" style={{height:40, objectFit:'contain'}}/>
            <strong>The Campus Insight Board</strong>
          </div>
          <nav style={{display:'flex', gap:16}}>
            <Link href="/rules">Rules</Link>
          </nav>
          <div style={{display:'flex', gap:8}}>
            <Button>Login / Register</Button>
            <Button className="outline" variant="outline">Post Review</Button>
          </div>
        </div>
      </header>

      <main className="container">
        <h2 className="text-2xl" style={{fontWeight:600, marginBottom:16}}>Explore Universities</h2>
        <div style={{display:'flex', gap:12, marginBottom:16}}>
          <div style={{flex:1, position:'relative'}}>
            <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by university, city or area"/>
            <div style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)'}}>
              <Search size={18} color="#94a3b8"/>
            </div>
          </div>
          <Button>Search</Button>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16}}>
          {results.map(u => (
            <Card key={u.id}>
              <CardHeader>
                <CardTitle style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span>{u.name}</span>
                  <Badge>{u.city}</Badge>
                </CardTitle>
                <CardDescription>{u.tags.join(' · ')}</CardDescription>
              </CardHeader>
              <CardContent style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', gap:8, color:'#334155'}}>
                  <Star size={16}/><span style={{fontWeight:600}}>{fmt(u.rating)}</span>
                  <span style={{color:'#94a3b8'}}>·</span>
                  <span>{u.reviews} reviews</span>
                </div>
                <Link href={`/university/${u.id}`}><Button className="outline" variant="outline">Profile</Button></Link>
              </CardContent>
            </Card>
          ))}
          {results.length === 0 && <div style={{gridColumn:'1 / -1', textAlign:'center', color:'#64748b', padding:'24px 0'}}>No results. Adjust your search.</div>}
        </div>
      </main>
    </div>
  );
}
