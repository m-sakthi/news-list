import { useQuery } from '@apollo/client';

import { FETCH_NEWS_LIST } from '../../graphApis';
import NewsCard from '../NewsCard';


const NewsList = () => {
  const { loading, error, data } = useQuery(FETCH_NEWS_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error while fetching news list.</p>;

  return (<div className='newsListContainer'>
    {data.news.map(({ uuid, title, author, date, likes }) => (
      <NewsCard key={uuid} title={title} author={author} date={date} likes={likes} uuid={uuid} />
    ))}
  </div>);
};

export default NewsList;