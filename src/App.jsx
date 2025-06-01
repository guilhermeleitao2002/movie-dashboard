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
  { id: 15, title: "The Lion King", year: 1994, genre: "Animation", rating: 8.5, budget: 45, revenue: 968.5, director: "Roger Allers", runtime: 88 },
  { id: 16, title: "Schindler's List", year: 1993, genre: "Biography", rating: 8.9, budget: 22, revenue: 321.2, director: "Steven Spielberg", runtime: 195 },
  { id: 17, title: "Fight Club", year: 1999, genre: "Drama", rating: 8.8, budget: 63, revenue: 100.9, director: "David Fincher", runtime: 139 },
  { id: 18, title: "The Lord of the Rings 1", year: 2001, genre: "Adventure", rating: 8.8, budget: 93, revenue: 871.5, director: "Peter Jackson", runtime: 178 },
  { id: 19, title: "The Lord of the Rings 3", year: 2003, genre: "Adventure", rating: 8.9, budget: 94, revenue: 1120.2, director: "Peter Jackson", runtime: 201 },
  { id: 20, title: "The Good, the Bad and the Ugly", year: 1966, genre: "Western", rating: 8.8, budget: 1.2, revenue: 38.9, director: "Sergio Leone", runtime: 178 },
  { id: 21, title: "Seven Samurai", year: 1954, genre: "Action", rating: 8.6, budget: 0.5, revenue: 3.5, director: "Akira Kurosawa", runtime: 207 },
  { id: 22, title: "City of God", year: 2002, genre: "Crime", rating: 8.6, budget: 3.3, revenue: 30.6, director: "Fernando Meirelles", runtime: 130 },
  { id: 23, title: "Se7en", year: 1995, genre: "Crime", rating: 8.6, budget: 33, revenue: 327.3, director: "David Fincher", runtime: 127 },
  { id: 24, title: "The Usual Suspects", year: 1995, genre: "Crime", rating: 8.5, budget: 6, revenue: 34.4, director: "Bryan Singer", runtime: 106 },
  { id: 25, title: "Life Is Beautiful", year: 1997, genre: "Comedy", rating: 8.6, budget: 20, revenue: 229.2, director: "Roberto Benigni", runtime: 116 },
  { id: 26, title: "Saving Private Ryan", year: 1998, genre: "Drama", rating: 8.6, budget: 70, revenue: 482.3, director: "Steven Spielberg", runtime: 169 },
  { id: 27, title: "The Pianist", year: 2002, genre: "Biography", rating: 8.5, budget: 35, revenue: 120.1, director: "Roman Polanski", runtime: 150 },
  { id: 28, title: "Gladiator", year: 2000, genre: "Action", rating: 8.5, budget: 103, revenue: 460.5, director: "Ridley Scott", runtime: 155 },
  { id: 29, title: "The Departed", year: 2006, genre: "Crime", rating: 8.5, budget: 90, revenue: 291.5, director: "Martin Scorsese", runtime: 151 },
  { id: 30, title: "Whiplash", year: 2014, genre: "Drama", rating: 8.5, budget: 3.3, revenue: 49.0, director: "Damien Chazelle", runtime: 106 },
  { id: 31, title: "The Prestige", year: 2006, genre: "Drama", rating: 8.5, budget: 40, revenue: 109.7, director: "Christopher Nolan", runtime: 130 },
  { id: 32, title: "Memento", year: 2000, genre: "Mystery", rating: 8.4, budget: 9, revenue: 39.7, director: "Christopher Nolan", runtime: 113 },
  { id: 33, title: "Casablanca", year: 1942, genre: "Drama", rating: 8.5, budget: 1.0, revenue: 3.7, director: "Michael Curtiz", runtime: 102 },
  { id: 34, title: "Apocalypse Now", year: 1979, genre: "Drama", rating: 8.4, budget: 31.5, revenue: 150.0, director: "Francis Ford Coppola", runtime: 147 },
  { id: 35, title: "Rear Window", year: 1954, genre: "Mystery", rating: 8.4, budget: 1.0, revenue: 36.8, director: "Alfred Hitchcock", runtime: 112 },
  { id: 36, title: "Raiders of the Lost Ark", year: 1981, genre: "Action", rating: 8.4, budget: 18, revenue: 389.9, director: "Steven Spielberg", runtime: 115 },
  { id: 37, title: "Django Unchained", year: 2012, genre: "Drama", rating: 8.4, budget: 100, revenue: 425.4, director: "Quentin Tarantino", runtime: 165 },
  { id: 38, title: "The Shining", year: 1980, genre: "Horror", rating: 8.4, budget: 19, revenue: 44.0, director: "Stanley Kubrick", runtime: 146 },
  { id: 39, title: "WALL·E", year: 2008, genre: "Animation", rating: 8.4, budget: 180, revenue: 521.3, director: "Andrew Stanton", runtime: 98 },
  { id: 40, title: "American Beauty", year: 1999, genre: "Drama", rating: 8.3, budget: 15, revenue: 356.3, director: "Sam Mendes", runtime: 122 },
  { id: 41, title: "The Social Network", year: 2010, genre: "Biography", rating: 7.7, budget: 40, revenue: 224.9, director: "David Fincher", runtime: 120 },
  { id: 43, title: "No Country for Old Men", year: 2007, genre: "Crime", rating: 8.1, budget: 25, revenue: 171.6, director: "Coen Brothers", runtime: 122 },
  { id: 44, title: "The Big Lebowski", year: 1998, genre: "Comedy", rating: 8.1, budget: 15, revenue: 46.7, director: "Coen Brothers", runtime: 117 },
  { id: 46, title: "Oldboy", year: 2003, genre: "Action", rating: 8.4, budget: 3.0, revenue: 15.0, director: "Park Chan-wook", runtime: 120 },
  { id: 47, title: "Amélie", year: 2001, genre: "Comedy", rating: 8.3, budget: 10, revenue: 173.9, director: "Jean-Pierre Jeunet", runtime: 122 },
  { id: 48, title: "Taxi Driver", year: 1976, genre: "Crime", rating: 8.2, budget: 1.9, revenue: 28.6, director: "Martin Scorsese", runtime: 114 },
  { id: 49, title: "Scarface", year: 1983, genre: "Crime", rating: 8.3, budget: 25, revenue: 65.9, director: "Brian De Palma", runtime: 170 },
  { id: 50, title: "Toy Story", year: 1995, genre: "Animation", rating: 8.3, budget: 30, revenue: 373.6, director: "John Lasseter", runtime: 81 },
  { id: 51, title: "Mad Max: Fury Road", year: 2015, genre: "Action", rating: 8.1, budget: 150, revenue: 378.9, director: "George Miller", runtime: 120 },
  { id: 52, title: "The Revenant", year: 2015, genre: "Adventure", rating: 8.0, budget: 135, revenue: 532.9, director: "Alejandro G. Iñárritu", runtime: 156 },
  { id: 53, title: "La La Land", year: 2016, genre: "Comedy", rating: 8.0, budget: 30, revenue: 446.1, director: "Damien Chazelle", runtime: 128 },
  { id: 54, title: "Arrival", year: 2016, genre: "Drama", rating: 7.9, budget: 47, revenue: 203.4, director: "Denis Villeneuve", runtime: 116 },
  { id: 55, title: "Get Out", year: 2017, genre: "Horror", rating: 7.7, budget: 4.5, revenue: 255.4, director: "Jordan Peele", runtime: 104 },
  { id: 56, title: "Joker", year: 2019, genre: "Crime", rating: 8.4, budget: 55, revenue: 1074.3, director: "Todd Phillips", runtime: 122 },
  { id: 57, title: "1917", year: 2019, genre: "War", rating: 8.3, budget: 95, revenue: 384.6, director: "Sam Mendes", runtime: 119 },
  { id: 58, title: "Barbie", year: 2023, genre: "Comedy", rating: 7.0, budget: 145, revenue: 1446.2, director: "Greta Gerwig", runtime: 114 },
  { id: 59, title: "Tenet", year: 2020, genre: "Action", rating: 7.5, budget: 200, revenue: 363.7, director: "Christopher Nolan", runtime: 150 },
  { id: 60, title: "Nomadland", year: 2020, genre: "Drama", rating: 7.3, budget: 5, revenue: 39.4, director: "Chloé Zhao", runtime: 108 },
  { id: 61, title: "Dune", year: 2021, genre: "Sci-Fi", rating: 8.0, budget: 165, revenue: 401.8, director: "Denis Villeneuve", runtime: 155 },
  { id: 62, title: "The Batman", year: 2022, genre: "Action", rating: 7.9, budget: 185, revenue: 770.8, director: "Matt Reeves", runtime: 176 },
  { id: 63, title: "Everything Everywhere All at Once", year: 2022, genre: "Action", rating: 8.0, budget: 25, revenue: 103.1, director: "Daniel Kwan", runtime: 139 },
  { id: 64, title: "Top Gun: Maverick", year: 2022, genre: "Action", rating: 8.3, budget: 170, revenue: 1486.7, director: "Joseph Kosinski", runtime: 130 },
  { id: 65, title: "Oppenheimer", year: 2023, genre: "Biography", rating: 8.5, budget: 100, revenue: 950.2, director: "Christopher Nolan", runtime: 180 }
];

const COLORS = ['#2563eb', '#7c3aed', '#dc2626', '#f59e0b', '#10b981', '#6366f1'];

const MovieExplorerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genreFilter, setGenreFilter] = useState('All');
  const [yearRange, setYearRange] = useState([1970, 2025]);
  const [ratingFilter, setRatingFilter] = useState(8.0);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const [budgetChartPage, setBudgetChartPage] = useState(0);

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
              value={yearRange[0]}
              onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
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
                  {filteredMovies
                    .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
                    .map(movie => (
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
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="text-sm text-gray-600">
                  Showing {Math.min(filteredMovies.length, 10)} of {filteredMovies.length} movies
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full ${currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-blue-600 hover:bg-blue-100'}`}
                    aria-label="Previous Page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">
                    {currentPage} / {Math.ceil(filteredMovies.length / moviesPerPage)}
                  </span>
                  
                  <button 
                    onClick={() => setCurrentPage(prev => 
                      prev < Math.ceil(filteredMovies.length / moviesPerPage) ? prev + 1 : prev
                    )}
                    disabled={currentPage >= Math.ceil(filteredMovies.length / moviesPerPage)}
                    className={`p-2 rounded-full ${
                      currentPage >= Math.ceil(filteredMovies.length / moviesPerPage)
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-blue-600 hover:bg-blue-100'}`}
                    aria-label="Next Page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
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
                  labelLine={false}
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
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="x" 
                  name="Runtime" 
                  unit=" min" 
                  type="number" 
                  domain={['dataMin-10', 'dataMax+10']}
                  tickCount={8}
                />
                <YAxis 
                  dataKey="y" 
                  name="Rating"
                  domain={[7, 10]} 
                  tickCount={7}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value, name, props) => {
                    if (name === "x") return [`${value} min`, "Runtime"];
                    if (name === "y") return [value, "Rating"];
                    return [value, name];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
                          <p className="font-bold text-gray-900 mb-1">{data.title}</p>
                          <p className="text-sm">Runtime: <span className="font-semibold">{data.x} min</span></p>
                          <p className="text-sm">Rating: <span className="font-semibold">{data.y}</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Movies" 
                  data={ratingRuntimeData.sort((a, b) => a.x - b.x)} 
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
            {/* Chart navigation controls */}
            <div className="flex justify-end mb-2">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Showing {budgetChartPage * 10 + 1}-{Math.min((budgetChartPage + 1) * 10, budgetRevenueData.length)} of {budgetRevenueData.length}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setBudgetChartPage(prev => Math.max(0, prev - 1))}
                    disabled={budgetChartPage === 0}
                    className={`p-2 rounded-full ${budgetChartPage === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-blue-600 hover:bg-blue-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => setBudgetChartPage(prev => prev + 1)}
                    disabled={budgetChartPage >= Math.floor(budgetRevenueData.length / 10)}
                    className={`p-2 rounded-full ${
                      budgetChartPage >= Math.floor(budgetRevenueData.length / 10)
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-blue-600 hover:bg-blue-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={budgetRevenueData
                .sort((a, b) => b.revenue - a.revenue)
                .slice(budgetChartPage * 10, (budgetChartPage + 1) * 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="title" 
                  angle={0} 
                  textAnchor="middle" 
                  height={130}
                  tick={{
                    fontSize: 12,
                    dy: 10,
                    dx: -5
                  }}
                />
                <YAxis label={{ value: 'Amount (Million $)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `$${value}M`} />
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