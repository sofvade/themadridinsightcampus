import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';

export default function UniversityProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [uni, setUni] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch('/api/universities').then(r=>r.json()).then(list => {
      setUni(list.find(x => String(x.id) === String(id)) || null);
    });
  }, [id]);

  if (!id) return <div className="container">Loading…</div>;
  if (!uni) return <div className="container">University not found.</div>;

  return (
    <div className="container">
      <Link href="/"><Button className="ghost">← Back</Button></Link>
      <Card style={{marginTop:16}}>
        <CardHeader>
          <CardTitle>{uni.name}</CardTitle>
          <CardDescription>{uni.city}, {uni.country}</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Rating:</strong> {uni.rating}</p>
          <p><strong>Reviews:</strong> {uni.reviews}</p>
          <p><strong>Tags:</strong> {uni.tags.join(', ')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
