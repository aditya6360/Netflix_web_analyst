import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'

const COLORS = ['#E50914', '#ff6b6b', '#ff4757', '#ff6348', '#ffa502', '#ff7f50', '#ff6b81', '#ff4500', '#ff6347', '#dc143c']

function StatCard({ title, value, color }) {
  return (
    <div style={{background: color, padding: '20px', borderRadius: '12px', textAlign: 'center', minWidth: '150px', flex: 1}}>
      <h2 style={{fontSize: '32px', margin: '0'}}>{value}</h2>
      <p style={{margin: '5px 0 0', fontSize: '14px'}}>{title}</p>
    </div>
  )
}

function App() {
  const [overview, setOverview]     = useState(null)
  const [genres, setGenres]         = useState([])
  const [years, setYears]           = useState([])
  const [countries, setCountries]   = useState([])
  const [ratings, setRatings]       = useState([])
  const [directors, setDirectors]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [activeTab, setActiveTab]   = useState('overview')

  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/overview').then(r => r.json()),
      fetch('http://127.0.0.1:8000/genres').then(r => r.json()),
      fetch('http://127.0.0.1:8000/years').then(r => r.json()),
      fetch('http://127.0.0.1:8000/countries').then(r => r.json()),
      fetch('http://127.0.0.1:8000/ratings').then(r => r.json()),
      fetch('http://127.0.0.1:8000/directors').then(r => r.json()),
    ]).then(([o, g, y, c, r, d]) => {
      setOverview(o)
      setGenres(g)
      setYears(y)
      setCountries(c)
      setRatings(r)
      setDirectors(d)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{background: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h2 style={{color: '#E50914', fontSize: '24px'}}>🎬 Loading Netflix Data...</h2>
    </div>
  )

  const tabs = ['overview', 'genres', 'years', 'countries', 'ratings', 'directors']

  return (
    <div style={{background: '#141414', minHeight: '100vh', color: 'white', fontFamily: 'Arial', padding: '20px'}}>

      {/* Header */}
      <h1 style={{color: '#E50914', textAlign: 'center', fontSize: '36px', marginBottom: '10px'}}>
        🎬 Netflix Analytics Dashboard
      </h1>

      {/* Stat Cards */}
      <div style={{display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap'}}>
        <StatCard title="Total Content" value={overview.total}    color="#E50914" />
        <StatCard title="Movies"        value={overview.movies}   color="#333"    />
        <StatCard title="TV Shows"      value={overview.tv_shows} color="#333"    />
      </div>

      {/* Tabs */}
      <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap'}}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? '#E50914' : '#333',
              color: 'white', border: 'none', padding: '10px 20px',
              borderRadius: '20px', cursor: 'pointer', fontSize: '14px',
              textTransform: 'capitalize'
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div style={{display: 'flex', justifyContent: 'center'}}>

        {/* Genres */}
        {activeTab === 'genres' && (
          <div>
            <h2 style={{textAlign: 'center'}}>Top 10 Genres</h2>
            <BarChart width={800} height={400} data={genres}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="genre" tick={{fill: 'white', fontSize: 10}} angle={-45} textAnchor="end" height={120} />
              <YAxis tick={{fill: 'white'}} width={60} />
              <Tooltip contentStyle={{background: '#333', border: 'none'}} />
              <Bar dataKey="count" fill="#E50914" radius={[4,4,0,0]} />
            </BarChart>
          </div>
        )}

        {/* Years */}
        {activeTab === 'years' && (
          <div>
            <h2 style={{textAlign: 'center'}}>Content Growth by Year</h2>
            <LineChart width={800} height={400} data={years}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" tick={{fill: 'white', fontSize: 11}} />
              <YAxis tick={{fill: 'white'}} width={60} />
              <Tooltip contentStyle={{background: '#333', border: 'none'}} />
              <Line type="monotone" dataKey="count" stroke="#E50914" strokeWidth={3} dot={false} />
            </LineChart>
          </div>
        )}

        {/* Countries */}
        {activeTab === 'countries' && (
          <div>
            <h2 style={{textAlign: 'center'}}>Top 10 Countries</h2>
            <BarChart width={800} height={400} data={countries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="country" tick={{fill: 'white', fontSize: 11}} angle={-45} textAnchor="end" height={100} />
              <YAxis tick={{fill: 'white'}} width={60} />
              <Tooltip contentStyle={{background: '#333', border: 'none'}} />
              <Bar dataKey="count" fill="#E50914" radius={[4,4,0,0]} />
            </BarChart>
          </div>
        )}

        {/* Ratings */}
        {activeTab === 'ratings' && (
          <div>
            <h2 style={{textAlign: 'center'}}>Content by Rating</h2>
            <PieChart width={600} height={400}>
              <Pie data={ratings} dataKey="count" nameKey="rating" cx="50%" cy="50%" outerRadius={150} label={({rating, percent}) => `${rating} ${(percent*100).toFixed(0)}%`}>
                {ratings.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{background: '#333', border: 'none'}} />
              <Legend />
            </PieChart>
          </div>
        )}

        {/* Directors */}
        {activeTab === 'directors' && (
          <div>
            <h2 style={{textAlign: 'center'}}>Top 10 Directors</h2>
            <BarChart width={800} height={400} data={directors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" tick={{fill: 'white'}} />
              <YAxis type="category" dataKey="director" tick={{fill: 'white', fontSize: 11}} width={150} />
              <Tooltip contentStyle={{background: '#333', border: 'none'}} />
              <Bar dataKey="count" fill="#E50914" radius={[0,4,4,0]} />
            </BarChart>
          </div>
        )}

        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{textAlign: 'center'}}>Movies vs TV Shows</h2>
            <PieChart width={500} height={400}>
              <Pie
                data={[
                  {name: 'Movies', value: overview.movies},
                  {name: 'TV Shows', value: overview.tv_shows}
                ]}
                dataKey="value" cx="50%" cy="50%" outerRadius={150}
                label={({name, percent}) => `${name} ${(percent*100).toFixed(0)}%`}
              >
                <Cell fill="#E50914" />
                <Cell fill="#333" />
              </Pie>
              <Tooltip contentStyle={{background: '#333', border: 'none'}} />
              <Legend />
            </PieChart>
          </div>
        )}

      </div>
    </div>
  )
}

export default App