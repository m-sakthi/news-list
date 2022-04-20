import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';
import { getTimestamp } from '../../utils';

const NewsCard = ({ title, author, date, likes, uuid }) => (
  <div className='card'>
    <Link to={`/news/${uuid}`} className='link'>
        <div className='cardContent'>
          <h4 className='cardTitle'>{title}</h4>
          <span className='rightFloatTxt'>- {author}</span>
          <div className='footer'>
            <span>{likes.toString()} likes</span>
            <span>{getTimestamp(date)}</span>
          </div>
        </div>
    </Link>
  </div>
);

NewsCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  likes: PropTypes.number
};

export default NewsCard;