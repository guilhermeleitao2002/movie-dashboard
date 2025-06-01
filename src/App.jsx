import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Film, Info, Search, Calendar, DollarSign, Star } from 'lucide-react';

const mockMovies = [
  { id: 1, title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3, budget: 25, revenue: 28.3, director: "Frank Darabont", runtime: 142 },
  { id: 2, title: "The Godfather", year: 1972, genre: "Crime", rating: 9.2, budget: 6, revenue: 246.1, director: "Francis Ford Coppola", runtime: 175 },
  { id: 3, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, budget: 185, revenue: 1004.6, director: "Christopher Nolan", runtime: 152 },
  { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crime", rating: 8.9, budget: 8, revenue: 213.9, director: "Quentin Tarantino", runtime: 154 },
  { id: 5, title: "Forrest Gump", year: 1994, genre: "Drama", rating: 8.8, budget: 55, revenue: 678.2, director: "Robert Zemeckis", runtime: 142 },
  { id: 6, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, budget: 160, revenue: 836.8, director: "Christopher Nolan", runtime: 148 },
  { id: 7, title: "The Matrix", year: 1999, genre: "Sci-Fi", rating: 8.7, budget: 63, revenue: 467.2, director: "Wachowski Sisters", runtime: 136 },
  { id: 8, title: "Goodfellas", year: 1990, genre: "Crime", rating: 8.7, budget: 25, revenue: 46.8, director: "Martin Scorsese", runtime: 146 },
  { id: 9, title: "Star Wars", year: 1977, genre: "Sci-Fi", rating: 8.6, budget: 11, revenue: 775.5, director: "George Lucas", runtime: 121 },
  { id: 10, title: "The Silence of the Lambs", year: 1991, genre: "Thriller", rating: 8.6, budget: 19, revenue: 272.7, director: "Jonathan Demme", runtime: 118 },
  { id: 11, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, budget: 165, revenue: 701.7, director: "Christopher Nolan", runtime: 169 },
  { id: 12, title: "Spirited Away", year: 2001, genre: "Animation", rating: 8.6, budget: 19, revenue: 395.8, director: "Hayao Miyazaki", runtime: 125 },
  { id: 13, title: "The Green Mile", year: 1999, genre: "Drama", rating: 8.6, budget: 60, revenue: 286.8, director: "Frank Darabont", runtime: 189 },
  { id: 14, title: "Parasite", year: 2019, genre: "Thriller", rating: 8.5, budget: 11.4, revenue: 258.7, director: "Bong Joon-ho", runtime: 132 },
  { id: 15, title: "The Lion King", year: 1994, genre: "Animation", rating: 8.5, budget: 45, revenue: 968.5, director: "Roger Allers", runtime: 88 }
];

const COLORS = ['#2563eb', '#7c3aed', '#dc2626', '#f59e0b', '#10b981', '#6366f1'];

const MovieExplorerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genreFilter, setGenreFilter] = useState('All');
  const [yearRange, setYearRange] = useState([1970, 2025]);
  const [ratingFilter, setRatingFilter] = useState(8.0);

  const filteredMovies = useMemo(() => {
    return mockMovies.filter(movie => {
      const genreMatch = genreFilter === 'All' || movie.genre === genreFilter;
      const yearMatch = movie.year >= yearRange[0] && movie.year <= yearRange[1];
      const ratingMatch = movie.rating >= ratingFilter;
      return genreMatch && yearMatch && ratingMatch;
    });
  }, [genreFilter, yearRange, ratingFilter]);

  const genreData = useMemo(() => {
    const genreCounts = filteredMovies.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(genreCounts).map(([genre, count]) => ({ genre, count }));
  }, [filteredMovies]);

  const yearData = useMemo(() => {
    const yearGroups = {};
    filteredMovies.forEach(movie => {
      const decade = Math.floor(movie.year / 10) * 10;
      yearGroups[decade] = (yearGroups[decade] || 0) + 1;
    });
    return Object.entries(yearGroups).map(([decade, count]) => ({ 
      decade: `${decade}s`, 
      count 
    })).sort((a, b) => a.decade.localeCompare(b.decade));
  }, [filteredMovies]);

  const budgetRevenueData = filteredMovies.map(movie => ({
    title: movie.title,
    budget: movie.budget,
    revenue: movie.revenue,
    profit: movie.revenue - movie.budget,
    rating: movie.rating
  }));

  const ratingRuntimeData = filteredMovies.map(movie => ({
    x: movie.runtime,
    y: movie.rating,
    title: movie.title
  }));

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === id 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const MovieDetails = () => {
    if (!selectedMovie) {
      return (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          <Film size={48} className="mx-auto mb-4 opacity-50" />
          <p>Select a movie from the table to view details</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{selectedMovie.title}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Year</p>
            <p className="font-semibold">{selectedMovie.year}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Genre</p>
            <p className="font-semibold">{selectedMovie.genre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Director</p>
            <p className="font-semibold">{selectedMovie.director}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rating</p>
            <p className="font-semibold flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              {selectedMovie.rating}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Budget</p>
            <p className="font-semibold">${selectedMovie.budget}M</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="font-semibold">${selectedMovie.revenue}M</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Runtime</p>
            <p className="font-semibold">{selectedMovie.runtime} min</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Profit</p>
            <p className={`font-semibold ${selectedMovie.revenue - selectedMovie.budget > 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(selectedMovie.revenue - selectedMovie.budget).toFixed(1)}M
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="bg-white shadow-lg rounded-lg mb-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <Film size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">CineMetrics</h1>
              <p className="text-gray-600">Interactive Movie Analytics Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => alert('About CineMetrics:\n\nThis dashboard provides interactive visualization and analysis of movie data including ratings, revenue, genres, and more. Use the filters and controls to explore the data and click on elements to see detailed information.')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Info size={18} />
            About
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <TabButton id="overview" label="Overview" icon={Search} />
        <TabButton id="financial" label="Financial" icon={DollarSign} />
        <TabButton id="timeline" label="Timeline" icon={Calendar} />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre Filter</label>
            <select 
              value={genreFilter} 
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Genres</option>
              {[...new Set(mockMovies.map(m => m.genre))].map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Range: {yearRange[0]} - {yearRange[1]}
            </label>
            <input 
              type="range" 
              min="1970" 
              max="2025" 
              value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating: {ratingFilter}
            </label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.1"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Movie Table */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Movie Database</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Title</th>
                    <th className="text-left py-2">Year</th>
                    <th className="text-left py-2">Rating</th>
                    <th className="text-left py-2">Genre</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map(movie => (
                    <tr 
                      key={movie.id} 
                      onClick={() => setSelectedMovie(movie)}
                      className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="py-2">{movie.title}</td>
                      <td className="py-2">{movie.year}</td>
                      <td className="py-2">{movie.rating}</td>
                      <td className="py-2">{movie.genre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Movie Details */}
          <MovieDetails />

          {/* Genre Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Genre Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  dataKey="count"
                  nameKey="genre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({genre, count}) => `${genre}: ${count}`}
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Rating vs Runtime Scatter Plot */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Rating vs Runtime</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Runtime" unit=" min" />
                <YAxis dataKey="y" name="Rating" domain={[8, 10]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter 
                  name="Movies" 
                  data={ratingRuntimeData} 
                  fill="#2563eb"
                  onClick={(data) => {
                    const movie = filteredMovies.find(m => m.title === data.title);
                    if (movie) setSelectedMovie(movie);
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget vs Revenue */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Budget vs Revenue Analysis</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={budgetRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} />
                <YAxis label={{ value: 'Amount (Million $)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#dc2626" name="Budget" />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Profit Analysis */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Profitability Rankings</h2>
            <div className="space-y-2">
              {budgetRevenueData
                .sort((a, b) => b.profit - a.profit)
                .slice(0, 7)
                .map((movie, index) => (
                  <div key={movie.title} className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">{index + 1}. {movie.title}</span>
                    <span className={`font-bold ${movie.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${movie.profit.toFixed(1)}M
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* ROI Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Return on Investment (ROI)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={budgetRevenueData.map(m => ({
                  title: m.title,
                  roi: ((m.revenue - m.budget) / m.budget * 100).toFixed(1)
                })).sort((a, b) => b.roi - a.roi).slice(0, 8)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} />
                <YAxis label={{ value: 'ROI %', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="roi" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Movies by Decade */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Movies by Decade</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="decade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Rating Trends */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Average Rating Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart 
                data={[...new Set(filteredMovies.map(m => m.year))].sort().map(year => {
                  const yearMovies = filteredMovies.filter(m => m.year === year);
                  return {
                    year,
                    avgRating: (yearMovies.reduce((sum, m) => sum + m.rating, 0) / yearMovies.length).toFixed(2)
                  };
                })}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[8, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="avgRating" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Director Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Top Directors by Average Rating</h2>
            <div className="space-y-2">
              {Object.entries(
                filteredMovies.reduce((acc, movie) => {
                  if (!acc[movie.director]) {
                    acc[movie.director] = { total: 0, count: 0, movies: [] };
                  }
                  acc[movie.director].total += movie.rating;
                  acc[movie.director].count += 1;
                  acc[movie.director].movies.push(movie.title);
                  return acc;
                }, {})
              )
                .map(([director, data]) => ({
                  director,
                  avgRating: (data.total / data.count).toFixed(2),
                  count: data.count,
                  movies: data.movies
                }))
                .sort((a, b) => b.avgRating - a.avgRating)
                .slice(0, 7)
                .map((director, index) => (
                  <div key={director.director} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <span className="font-medium">{index + 1}. {director.director}</span>
                      <span className="text-sm text-gray-600 ml-2">({director.count} movies)</span>
                    </div>
                    <span className="font-bold text-blue-600">{director.avgRating}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieExplorerDashboard;