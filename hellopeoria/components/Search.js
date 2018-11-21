import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => (
    <div className="search">
        {/* <div className="search-button"><FontAwesomeIcon icon={faSearch} /></div> */}
        <input type="text" id="search" name="search" placeholder='Try "Coffee Shop"' />
    </div>
)

export default Search;