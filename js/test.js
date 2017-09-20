
onmessage = function(e) {

var response = e.data[0];
var baseAPI = e.data[1]
var pageLimit = 200;

  let getMapInfo1 = fetch(baseAPI + 'maps?ids=' + response.slice(0, pageLimit))
  .then(function(response){
    return response.json();
  })

  let getMapInfo2 = fetch(baseAPI + 'maps?ids=' + response.slice(200, 400))
  .then(function(response){
    return response.json();
  })

  let getMapInfo3 = fetch(baseAPI + 'maps?ids=' + response.slice(400, 600))
  .then(function(response){
    return response.json();
  })

  let getMapInfo4 = fetch(baseAPI + 'maps?ids=' + response.slice(600, 800))
  .then(function(response){
    return response.json();
  })

    Promise.all([getMapInfo1, getMapInfo2, getMapInfo3, getMapInfo4]).then(values => {
              totalMapList = values[0].concat(values[1], values[2], values[3])
              console.log(totalMapList);

            var publicMaps =  totalMapList.filter(function (el) {
              return el.type == "Public"
            })

            console.log(publicMaps)
  });

}
