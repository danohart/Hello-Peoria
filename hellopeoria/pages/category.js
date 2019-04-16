import CategoryPlaces from '../components/Category';

const Category = props => (
  <div>
    <CategoryPlaces category={props.query.category} />
  </div>
);

export default Category;
