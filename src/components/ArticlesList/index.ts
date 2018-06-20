import { connect } from 'react-redux';

import { loadArticles, removeArticle, removeComment } from '../../ducks/articlesDuck';

import ArticlesList from './ArticlesList';

export default connect((state: any) => ({
    articles: state.articles.articlesList,
}), {
    loadArticles,
    removeArticle,
    removeComment,
})(ArticlesList);
