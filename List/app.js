angular.module ("myApp",[])
.controller ("firstctrl",function($scope, $http){

  //Массивы для временного хранения данных сотрудника во время заполнения/изменения формы
  $scope.autoskill=["css","html","php","js","angularjs","sass","nodejs","jQuery","AJAX","MySQL","XML/XSLT","Photoshop","C++","C#"];
  $scope.temp=[];
  $scope.newuser= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
  $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
  $scope.users= [{"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""}];
  //Извлечение данных о сотрудниках из файла staff.json
  $http.get('staff.json').then(function(response) {
      $scope.users = response.data.users;
    });
  $scope.showsearch={visible:true};
  $scope.count=0;
  //Занести данные о новом сотрудника в список
  $scope.addnewuser = function (addnewuserform){
    if (addnewuserform.$valid){
        $scope.newuser.id=$scope.users.length+1;
        if ($scope.newuser.sometext!=="")
            $scope.count+=10;
        if ($scope.newuser.moretext!=="")
            $scope.count+=10;
        if ($scope.newuser.photo!=="")
            $scope.count+=20;
        $scope.count=(($scope.count+20+$scope.newuser.skills.length*5)*100)/85;
        $scope.newuser.full=$scope.count.toFixed(2);
        $scope.count=0;
        $scope.users.push($scope.newuser);
    	  $scope.newuser= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
        $scope.newuserform= {visible: false};
    }
  }
  $scope.newuserform= {visible: ""};
  //Показать форму для введения данных о новом сотруднике
  $scope.shownewuserform= function (){
      $scope.newuserform= {visible: true};
      $scope.personalcard= {visible: false};
      $scope.changeform= {visible: false};
      $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
  }
  //Скрыть форму для введения данных о новом сотруднике
  $scope.hidenewuserform= function (){
    $scope.newuserform= {visible: false};
    $scope.newuser= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","bithday":"","moretext":"","photo":"","full": ""};
  }
  $scope.personalcard= {visible: ""};
  //Показать карточку с данными сотрудника
  $scope.showpersonalcard= function (index){
      $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
      $scope.personalcard= {visible: true};
      $scope.user=$scope.users[index];
      $scope.newuserform= {visible: false};
      $scope.changeform= {visible: false};
  }
  //Скрыть карточку с данными сотрудника
  $scope.hidepersonalcard= function (){
      $scope.personalcard= {visible: false};
      $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
  }
  $scope.changeform={visible: ""};
  //Показать форму для изменения данных сотрудника
  $scope.showchangeform= function (index){
       $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
       $scope.newuserform= {visible: false};
       $scope.changeform= {visible: true};
       $scope.personalcard= {visible: false};
       $scope.user=$scope.users[index];
  }
  //Скрыть форму для изменения данных сотрудника
  $scope.hidechangeform= function (){
      $scope.changeform= {visible: false};
      $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
  }
  //Сохранить измененные данные сотрудника
  $scope.savechangedata= function (){
      $scope.changeform= {visible: false};
      if ($scope.user.sometext!=="")
          $scope.count+=10;
      if ($scope.user.moretext!=="")
          $scope.count+=10;
      if ($scope.user.photo!=="")
          $scope.count+=20;
      $scope.count=(($scope.count+20+$scope.user.skills.length*5)*100)/85;
      $scope.user.full=$scope.count.toFixed(2);
      $scope.count=0;
      $scope.count+=10;
      $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
  }
  //Удалить сотрудника из списка
  $scope.deleteuser= function (index){
       $scope.personalcard= {visible: false};
       $scope.users.splice (index,1);
       var i;
       for ( var i=0; i<=$scope.users.length-index; i++){
         $scope.users[index+i].id=index+i+1;
       }
       $scope.user= {"id": "","firstname":"","lastname":"","sometext":"","skills":[],"gender":"","birthday":"","moretext":"","photo":"","full": ""};
  }
  //Функции автоматического добавления данных о навыках
  $scope.addskill1= function (x){
    $scope.newuser.skills[0]=x;
  }
  $scope.addskill2= function (x){
    $scope.newuser.skills[1]=x;
  }
  $scope.addskill3= function (x){
    $scope.newuser.skills[2]=x;
  }
  $scope.addskill4= function (x){
    $scope.newuser.skills[3]=x;
  }
  $scope.addskill5= function (x){
    $scope.newuser.skills[4]=x;
  }
  $scope.skillchange1= function (x){
    $scope.user.skills[0]=x;
  }
  $scope.skillchange2= function (x){
    $scope.user.skills[1]=x;
  }
  $scope.skillchange3= function (x){
    $scope.user.skills[2]=x;
  }
  $scope.skillchange4= function (x){
    $scope.user.skills[3]=x;
  }
  $scope.skillchange5= function (x){
    $scope.user.skills[4]=x;
  }
});
