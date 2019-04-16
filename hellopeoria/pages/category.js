import CategoryPlaces from '../components/Category';

const Category = props => (
  <div>
    <h1>{props.query.category}s</h1>
    <CategoryPlaces category={props.query.category} />
  </div>
);

export default Category;
