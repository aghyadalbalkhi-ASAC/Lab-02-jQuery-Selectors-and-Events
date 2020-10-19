'use strict';
let allHorns = [];
let allKeyWords = [];
function Horns(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  allHorns.push(this);
}
Horns.prototype.show = function () {
  let templete = $('.photo-template').clone();
  $('main').append(templete);
  templete.find('h2').text(this.title);
  templete.find('img').attr('src', this.image_url);
  templete.find('p').text(this.description);
  templete.removeClass('photo-template');
};
let readJosn = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let horn = new Horns(item);
        horn.show();
        if (allKeyWords.indexOf(horn.keyword) === -1) {
          allKeyWords.push(horn.keyword);
        }
      });
      addSelectOptions();
    });
};
function addSelectOptions() {
  allKeyWords.forEach(function (value) {
    $('select').append(`<option value=${value}>${value}</option>`);
  });
}
$(document).ready(function () { readJosn(); });

$('select').click(function (event) {

  let def = $('select').val();

  if (event.target.value !== 'default' || event.target.value !== def) {
    console.log(event.target.value);
   
    $('main').empty();
    addsectionTemplate();
    allHorns.forEach(function (value, indext) {

      if (value.keyword === event.target.value) {
        value.show();
      }
    }); 
  }
});

function addsectionTemplate (){
  $('main').append(` <section class="photo-template">
  <h2></h2>
  <img src="" alt="">
  <p></p>
</section>`);

}


