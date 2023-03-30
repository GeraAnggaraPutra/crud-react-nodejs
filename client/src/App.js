import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewreview] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    })
  }, []);

  const submitReview = () => {
    axios.post('http://localhost:3001/api/insert',
      { movieName: movieName, movieReview: review, });
    
    setMovieList([...movieReviewList, { movieName: movieName, movieReview: review, }]);
  };

  const deleteReview = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`);
  }

  const updateReview = (id) => {
    axios.put('http://localhost:3001/api/update/', { id: id, movieReview: newReview, });
    setNewreview('')
  }

  return (
    <div className="App">
      <h1>CRUD REACT NODE JS</h1>
      <div className='form'>
        <label>Movie Name</label>
        <input type="text" name='movieName' onChange={(e) => {setMovieName(e.target.value)}}/>
        <label>Review</label>
        <input type="text" name='review' onChange={(e) => {setReview(e.target.value)}}/>
        
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className='card'>
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button onClick={()=>{deleteReview(val.id)}}>Delete</button>
              <input type="text" id="updateinput" onChange={(e)=>{setNewreview(e.target.value)}}/>
              <button onClick={()=>{updateReview(val.id)}}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
