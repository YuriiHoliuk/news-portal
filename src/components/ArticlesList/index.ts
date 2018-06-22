import { connect } from 'react-redux';

import { loadArticles, removeArticle, removeComment } from '../../store/ducks';

import ArticlesList from './ArticlesList';

export default connect((state: any) => ({
    articles: state.get('articles').get('articlesList'),
}), {
    loadArticles,
    removeArticle,
    removeComment,
})(ArticlesList);
