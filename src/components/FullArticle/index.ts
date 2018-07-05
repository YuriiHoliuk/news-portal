import FullArticle from './FullArticle';
import { withRemoveModal } from '../../hocs';
import { connect } from 'react-redux';

export default connect((state: any) => ({

}))(withRemoveModal(FullArticle));
