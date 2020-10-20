'use strict';
let allHorns = [];
let allKeyWords = [];
let dataRecived = 'data/page-1.json';

function Horns(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  allHorns.push(this);
}
Horns.prototype.show = function () {

  let templete = $('.photo-template').html();
  let sectionItem = Mustache.render(templete, this);
  $('main').append(sectionItem);

  /// Another Solution  Using jQuery

  // let templete = $('.photo-template').clone();
  // $('main').append(templete);
  // templete.find('h2').text(this.title);
  // templete.find('img').attr('src', this.image_url);
  // templete.find('p').text(this.description);
  // templete.removeClass('photo-template');

};



let readJosn = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax(dataRecived, ajaxSettings)
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






// Function to Filttring the Images 

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

function addsectionTemplate() {
  $('main').append(`<template  class="photo-template" >

  <section>
    <h2>{{title}}</h2>
    <img src="{{image_url}}" alt="">
    <p>{{description}}</p>
    <p>{{horns}}</p>
  </section>

</template>`);

  ///// Another Solution

  // $('main').append(` <section class="photo-template">
  // <h2></h2>
  // <img src="" alt="">
  // <p></p>
  // </section>`);

}



$("#Firstpage").click(function () {

  dataRecived = 'data/page-1.json';
  reloadThePage();
  clearList();
  readJosn();
});


$("#SecondPage").click(function () {

  dataRecived = 'data/page-2.json';
  reloadThePage();
  clearList();
  readJosn();

});




////////////////////// Sort /////////////////////////

$("#sortByHorns").click(function () {

  dataRecived = 'data/page-1.json';
  sortOption();
  reloadThePage();

  allHorns.forEach(function (value) {
    value.show();
  });


});


$("#sortByTitle").click(function () {

  dataRecived = 'data/page-2.json';
  reloadThePage();

});


function sortOption() {
  allHorns.sort((a, b) => {
    return Number(a.horns) - Number(b.horns);
  });

}




function reloadThePage() {

  $('main').empty();
  addsectionTemplate();
  $('select').val("default");

}

function clearList() {

  $('select').empty();
  allHorns=[];
  allKeyWords=[];
  $('select').append(`<option value="default">Filter by Keyword</option>`);



}