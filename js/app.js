'use strict';

let allHorns = [];

function Horns(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  allHorns.push(this);

}


Horns.prototype.show= function(){

  let templete = $('.photo-template').clone();
  $('main').append(templete);

  templete.find('h2').text(this.title);
  templete.find('img').attr('src', this.image_url);
  templete.find('p').text(this.description);
  templete.removeClass('photo-template');

};

Horns.readJosn =() => {
  const ajaxSettings ={
    method : 'get',
    dataType : 'json'

  };

  $.ajax('data/page-1.json',ajaxSettings) 
    .then (data => {
      data.forEach(item=> {
        let horn = new Horns(item);
        horn.show();

      });

    });

};

$(()=>Horns.readJosn());
