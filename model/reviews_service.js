const { Review, Meta, LastID } = require('./reviewsModel.js');

const getLast = (type, callback) => {
  const updatedField = type === 'review' ? 'review_id' : 'photo_id';
  LastID.findOneAndUpdate({}, {$inc:{[updatedField]: 1}}, (err, result) => err ? callback(err, null) : callback(null, result[updatedField] + 1));
};

const updateMeta = (review, callback) => {
  const {product_id, rating, recommend, characteristics} = review
  Meta.findOne({product_id}).exec((err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const {totalReviews} = result;
      result.rating[rating] =  result.rating[rating] ? result.rating[rating]+1 : 1;
      result.recommended[recommend] =  result.recommended[recommend] ? result.recommended[recommend]+1 : 1;

      for (const key in result.characteristics) {
        for (const char_id in characteristics) {
          if ( result.characteristics[key].id === Number(char_id)) {
            let value = result.characteristics[key]['value']
            result.characteristics[key]['value'] = Number.parseFloat((value * totalReviews + characteristics[char_id])/ (totalReviews + 1)).toFixed(2)
          }
        }
      }

      Meta.findOneAndUpdate({product_id}, {$set:{rating: result.rating, recommended: result.recommended, characteristics: result.characteristics}, $inc:{totalReviews: 1}}, (err, result) => {
        err ? callback(err, null) : callback(null, result)
      });
    }
  });
};

module.exports = {
  getReview: (product_id, page, count, sort, callback) => {
    page = page || 1;
    count = count || 5;
    sort =  sort ? sort === 'helpful' ? {'helpfulness': -1} : {date: -1} : {};
    Review.find({product_id, reported:false}).select('-_id -product_id -reviewer_email -__v').sort(sort).limit(page*count).lean().exec((err, result) => {
      callback(null, {product_id, page, count, results: result.slice(page*count - count)});
    });
  },

  getMeta:(product_id, callback) => {
    Meta.findOne({product_id}).select('-_id -__v -totalReviews').exec((err, result) => {
      err ? callback(err, null) : callback(null,result)
    })
  },

  addReview: (review, callback) => {
    const {product_id, photos, name, email, characteristics, recommend, rating} = review;
    review.reviewer_name = name;
    review.reviewer_email = email;
    review.helpfulness = 0;
    review.response = 'null';
    delete review.name;
    delete review.email;

    new Promise((res, rej) => {
      updateMeta({product_id, recommend, rating, characteristics}, (err, result) => {
        err ? rej(err) : res(result);
      })
    }).then(() => {
      new Promise ((res, rej) => {
        getLast('review', (err, result) => {
          err ? rej(err) : res(result)
        })
      }).then((result)=> {
        review = {id: result, ...review};
        const promises = [];
        const photoList = []
        if(photos.length) {
          photos.forEach(el => {
            promises.push(
              new Promise ((res, rej) => {
                getLast('photo', (err, result) => {
                  if (err) {
                    rej(err)
                  } else {
                    photoList.push({id: result, url: el});
                    res(photoList);
                  }
                })
              })
            )
          });
          Promise.all(promises).then(() => {
            review.photos = photoList;
            new Review(review).save().then(result => callback(null, result));
          });
        } else {
          new Review(review).save().then(result => callback(null, result));
        }
      });
    });
  },

  updateField: (review_id, field, callback)=> {
    const option = field === 'helpful' ? {$inc: {helpfulness: 1}} : {$set:{reported: true}};
    Review.findOneAndUpdate({id: review_id}, option, (err, result) => {
      err ? callback(err, null) : callback(null, 'updated');
    })
  }
}


/** All functions below are used for cleaning up data after each route test */
const cleanUpID = () => {
  LastID.updateOne({}, {$set:{review_id: 5774952, photo_id
    :
    9999}}, (err, result) => {console.log(result)})
}

const deleteReview = (id) => {
  Review.deleteOne({id}, (err, result) => {
    err ? console.log(err) : console.log(result);
  })
}

const cleanUpMeta = () => {
  Meta.findOneAndUpdate({product_id: 3}, {$set: {characteristics: {Fit: {id: 6, value: 0}, Length: {id: 7, value:0}, Comfort: {id: 8, value: 0}, Quality: {id: 9, value:0}} , rating:{}, recommended:{}, totalReviews:0}}, (err, result) => err ? console.log(err) : console.log(result))
}

const cleanUpHelpfultest = () => {
  Review.findOneAndUpdate({id:3}, {$set:{helpfulness: 5}}, (err, result) => {
    err ? console.log(err) : console.log(result)
  })
};

const cleanUpReportTest = () => {
  Review.findOneAndUpdate({id:3}, {$set:{reported: false}}, (err, result) => {
    err ? console.log(err) : console.log(result)
  })
}

// cleanUpHelpfultest();
// cleanUpReportTest();
// cleanUpMeta();
// cleanUpID();
// deleteReview(5774953)
