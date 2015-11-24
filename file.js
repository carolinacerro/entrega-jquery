var API_BASE_URL = " http://localhost:8080/myapp";

$("#button_list").click(function(e) {
	e.preventDefault();
	getFiles();
});

$("#button_post").click(function(e) {
	e.preventDefault();
	var file = new Object();
	file.name = $("#file_name").val();
	file.description = $("#descripcion").val();
	file.fecha = $("#fecha").val();
	file.tamaño = $("#tamano").val();
	file.tags = $("#tags").val();
	file.url = $("#url").val();
	postFile(file);
});

$("#button_get").click(function(e) {
	e.preventDefault();
	var file_name=$("#file_name").val();
	getFile(file_name);
});

$("#button_put").click(function(e) {
	e.preventDefault();
	var file = new Object();
	file.name = $("#file_name").val();
	file.description = $("#descripcion").val();
	UpdateFile(file);

});

$("#button_delete").click(function(e) {
	e.preventDefault();
	deleteFile($("#file_name").val());
});

$("#button_pagination").click(function(e) {
	e.preventDefault();

	getFilesPagination($("#file_name").val());
});


function getFiles() {
	var url = API_BASE_URL + '/file/list' ;
	$("#result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var files = data.files;
				
				$.each(files, function(i, v) {
					var file = v;

					$('<br><strong> Creationdate: ' + file.creationdate + '</strong><br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + file.description + '<br>').appendTo($('#result'));
					$('<strong> Name: </strong> ' + file.name + '<br>').appendTo($('#result'));
					$('<strong> TAG: </strong> ' + file.taglist + '<br>').appendTo($('#result'));
					$('<strong> Size: </strong> ' + file.size + '<br>').appendTo($('#result'));
					$('<strong> URL: </strong> ' + file.url + '<br>').appendTo($('#result'));
				});
				

	}).fail(function() {
		$("#result").text("No file.");
	});

}

function postFile(file) {
	var url = API_BASE_URL + '/file';
	var data = JSON.stringify(file);
	
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		contentType: "application/json ",
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> File Created</div>').appendTo($("#result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});
}

function getFile(file_name) {
	var url = API_BASE_URL + '/file/' + file_name;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
					var file = data;

					$('<br><strong> Creationdate: ' + file.creationdate + '</strong><br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + file.description + '<br>').appendTo($('#result'));
					$('<strong> Name: </strong> ' + file.name + '<br>').appendTo($('#gresult'));
					$('<strong> Size: </strong> ' + file.size + '<br>').appendTo($('#result'));
					$('<strong> TAG: </strong> ' + file.tagslist + '<br>').appendTo($('#result'));
					$('<strong> URL: </strong> ' + file.url + '<br>').appendTo($('#result'));
					


	}).fail(function() {
		$("#result").text("No File.");
	});

}

function UpdateFile(file) {
	var url = API_BASE_URL + '/file/' + file.name;
	var data = JSON.stringify(file);
	
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		contentType : "application/json ",
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});

	
}

function deleteFile(file_name) {
		
	var url = API_BASE_URL + '/file/'  + file_name;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json',
		statusCode: {
      200: function (response) {
         $('<div class="alert alert-success"> <strong>Ok!</strong> File Deleted</div>').appendTo($("#result"))
      },
      202: function (response) {
         $('<div class="alert alert-success"> <strong>Ok!</strong> File Deleted</div>').appendTo($("#result"))
      },
      400: function (response) {
         $('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
      },
      404: function (response) {
         $('<div class="alert alert-danger"> <strong>Oh!</strong> Server not found </div>').appendTo($("#result"));
      }
 }})}

function FileCollection(fileCollection){
	this.files = fileCollection;
        var href = {};

	var instance = this;

	this.buildLinks = function(header){
		this.links = weblinking.parseHeader(header);
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}

	this.toHTML = function(){
		var html = '';
		$.each(this.files, function(i, v) {
			var file = v;
			console.log(file);
			html = html.concat('<br><strong> ID: ' + file.id + '</strong><br>');
            html = html.concat('<br><strong> Description: ' + file.description + '</strong><br>');
            html = html.concat('<br><strong> Creation Date: ' + file.creationdate + '</strong><br>');
            html = html.concat('<br><strong> TAGlist: ' + file.taglist + '</strong><br>');
            
             html = html.concat('<br><strong> URL: ' + file.url + '</strong><br>');
			
		});
		
		html = html.concat(' <br> ');

                var prev = this.getLink('prev');
		if (prev.length == 1) {
			console.log(prev[0].href);
			html = html.concat(' <a onClick="getFilesPagination(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Prev]</a> ');
		}
                var next = this.getLink('next');
		if (next.length == 1) {
			html = html.concat(' <a onClick="getFilesPagination(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Next]</a> ');
		}
 		return html;	
	}
}

function getFilesPagination(file_name) {
	var url = API_BASE_URL + file_name + 'pagination?page=2';
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
        	var response = data.files;
		var fileCollection = new FileCollection(response);
                var linkHeader = jqxhr.getResponseHeader('Link');
                fileCollection.buildLinks(linkHeader);
				console.log(linkHeader);

		var html = fileCollection.toHTML();
		$("#result").html(html);

	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});

}