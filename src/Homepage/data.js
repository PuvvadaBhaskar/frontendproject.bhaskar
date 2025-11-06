// Shared demo data for attractions
const cards = [
  {
    id: 1,
    title: 'South Goa Sightseeing Full Day Tour',
    subtitle: '(09 am - 06 pm) · 3.2 rating · 23 Day Trips',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60',
    description: 'Full day tour of South Goa visiting beaches, temples and local markets. Includes transportation and light refreshments.',
    gallery: [
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1491972690050-ba117db4dc09?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 2,
    title: 'Heritage Temple & City Tour',
    subtitle: '(09 am - 06 pm) · 3.2 rating · 20 Day Trips',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c0?auto=format&fit=crop&w=1200&q=60',
    description: 'Guided visit to historic temples and city landmarks with a local guide.',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 3,
    title: 'Taj Mahal Day Trip',
    subtitle: '4.2 rating · 20 Day trips',
    image: 'https://images.unsplash.com/photo-1549893078-9f2f8d66c6b0?auto=format&fit=crop&w=1200&q=60',
    description: 'Sunrise trip to the Taj Mahal with optional photography stop and lunch.',
    gallery: [
      'https://images.unsplash.com/photo-1523419409543-a7d8b5dc1b47?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 4,
    title: 'Backwaters Boat Ride',
    subtitle: '4.6 rating · Nature & Relaxation',
    image: 'https://images.unsplash.com/photo-1513415189159-8b3d0b4301b9?auto=format&fit=crop&w=1200&q=60',
    description: 'Serene boat cruise through lush backwaters with local snacks and music.',
    gallery: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1526483360412-f4dbaf036963?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 5,
    title: 'Mountain Viewpoint Hike',
    subtitle: '4.8 rating · Guided Hike',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60',
    description: 'Early morning trek to a panoramic viewpoint. Perfect for sunrise photos.',
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 6,
    title: 'Old Fort & Lighthouse',
    subtitle: '4.1 rating · History',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
    description: 'Explore an ancient coastal fort and climb the lighthouse for sweeping views.',
    gallery: [
      'https://images.unsplash.com/photo-1504198266285-165a3c52e5ed?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 7,
    title: 'Tea Estate Walk',
    subtitle: '4.5 rating · Plantation Tour',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=60',
    description: 'Stroll through fragrant tea gardens and learn about harvesting and tasting.',
    gallery: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1498579809087-ef1e558fd1d1?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 8,
    title: 'City Food Crawl',
    subtitle: '4.7 rating · Street Food',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=60',
    description: 'Sample the best local bites across hidden alleys with a foodie host.',
    gallery: [
      'https://images.unsplash.com/photo-1445979323117-80453f573b71?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 9,
    title: 'Desert Safari & Campfire',
    subtitle: '4.6 rating · Adventure',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
    description: 'Dune bashing at sunset followed by campfire dinner under the stars.',
    gallery: [
      'https://images.unsplash.com/photo-1496568816309-51d7c20e3b6d?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1500530856044-9f2a0d2a6aeb?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 10,
    title: 'Waterfall Day Out',
    subtitle: '4.4 rating · Picnic Spots',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60',
    description: 'Chill by cascading falls with swimming spots and shaded picnic areas.',
    gallery: [
      'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 11,
    title: 'Heritage Walk Old Town',
    subtitle: '4.3 rating · Culture',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=60',
    description: 'Discover old town alleys, artisan workshops, and charming courtyards.',
    gallery: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=60'
    ]
  },
  {
    id: 12,
    title: 'Island Hopping Cruise',
    subtitle: '4.9 rating · Boat Tour',
    image: 'https://images.unsplash.com/photo-1519821172141-b5d8f1f1f2d3?auto=format&fit=crop&w=1200&q=60',
    description: 'Full-day cruise with snorkeling stops and a beachside lunch.',
    gallery: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60'
    ]
  }
]

export default cards
