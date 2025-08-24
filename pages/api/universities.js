export default function handler(req, res) {
  const data = [
    { id: "1", name: "Universidad Complutense de Madrid", city: "Madrid", country: "Spain", rating: 4.5, reviews: 128, tags: ["Public","Humanities","Medicine"] },
    { id: "2", name: "Universidad Carlos III de Madrid", city: "Getafe", country: "Spain", rating: 4.3, reviews: 96, tags: ["Engineering","Economics","Public"] },
    { id: "3", name: "IE University", city: "Segovia / Madrid", country: "Spain", rating: 4.1, reviews: 211, tags: ["Private","Business","International"] },
    { id: "4", name: "Universidad de Barcelona", city: "Barcelona", country: "Spain", rating: 4.4, reviews: 173, tags: ["Public","Science","Health"] },
  ];
  const q = String(req.query.q || '').toLowerCase();
  const filtered = data.filter(u => 
    u.name.toLowerCase().includes(q) ||
    u.city.toLowerCase().includes(q) ||
    u.tags.join(' ').toLowerCase().includes(q)
  );
  res.status(200).json(filtered);
}
