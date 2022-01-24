module.exports.validation = (requestType, target, req) => {
  const {product_id, review_id, sort, page, count, rating, summary, body, recommend, name, email, photos, characteristics} = req.body;

  if(requestType === 'get') {
    if( typeof(product_id) !=== 'number' || product_id < 1) {
      return 'invalid product_id';
    } else if (sort !== undefined && (typeof(sort) !== 'string' || !['newest', 'helpful'].includes(sort))) {
      return 'invalid sort';
    } else if (page !== undefined && ((typeof(page) !== 'number') || page < 1)) {
      return 'invalid page'
    }
  } else if (requestType === 'post') {
    if((typeof(rating) !== 'number') || rating < 1 || rating > 5) {
      return 'invalid rating';
    } else if (summary && typeof(summary) !== 'string') {
      return 'invalid summary';
    }else if ([body, name, email].some(el => typeof(el) !== 'string')) {
      return 'invalid some/ all of these fields : body, name, email';
    }else if(!Array.isArray(photos)) {
      return 'invalid photos';
    }else if (!Array.isArray(characteristics) && typeof(characteristics) !== 'object') {
      return 'invalid characteristics';
    }
  } else if (requestType === 'put') {
    if (typeof(reviews_id) !== 'number' || reviews_id < 1 ) {
    return 'invalid review_id';
    } else if (typeof(target) !== 'string' || !['helpful', 'report'].includes(target)) {
      return 'invalid request, Only allow to vote for helpfulness or report the review only!'
    }
  }
  return 'valid';
}