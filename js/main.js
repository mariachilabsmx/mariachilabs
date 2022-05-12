var db={};
$(document).ready(function() {
	$.getJSON("js/data.json", function(json) {
		var obj={};
		$.extend(true, db, json);
	    // console.log(db); // this will show the info it in firebug console
	    obj=objarreglo(db);

	    fillOptions(obj.giro, 'giro');
	    fillOptions(obj.puesto, 'puesto');
		$('#btn-buscar')[0].click();
	});
});
$("#forma").submit(function (e) {
    e.preventDefault();
	$('.class-search')[0].click();    
});
$('.class-search').click(function() {
var forma={empresa:'', estatus:'', tipo:'', giro:'', sector:'', contacto:'', puesto:''};
var result=[];
	if($('#empresa').val() !== '')
		forma.empresa=$('#empresa').val();

	if($('input[name="estatus_fs"]:checked').val() !== '')
		forma.estatus=$('input[name="estatus_fs"]:checked').val();

	if($('#tipo').val() !== '')
		forma.tipo=$('#tipo').val();

	if($('#giro').val() !== '')
		forma.giro=$('#giro').val();

	if($('#sector').val() !== '')
		forma.sector=$('#sector').val();

	if($('#contacto').val() !== '')
		forma.contacto=$('#contacto').val();

	if($('#puesto').val() !== '')
		forma.puesto=$('#puesto').val();

	for(var i in db){
		if(findString(db[i].empresa.toLowerCase(),forma.empresa.toLowerCase()) &&
		findString(db[i].estatus,forma.estatus) &&
		findString(db[i].tipo,forma.tipo) &&
		findString(db[i].giro,forma.giro) &&
		findString(db[i].sector,forma.sector) &&
		findString(db[i].contacto.toLowerCase(),forma.contacto.toLowerCase()) &&
		findString(db[i].c_puesto,forma.puesto) ){
			result.push(db[i]);
		}
	}
	resultados(result);
});
function resultados(array){
	var contador=1,
	a_html=[];
	if(array.length !== 0){
		for(var i in array){
			a_html.push('<tr> <td>'+contador+'</td> <td>'+array[i].empresa+'</td> <td>'+array[i].estatus+'</td> <td>'+array[i].tipo+'</td> <td>'+array[i].giro+'</td> <td>'+array[i].direccion+'</td> <td>'+array[i].telefono+'</td> <td>'+array[i].correo+'</td> <td>'+array[i].sector+'</td> <td>'+array[i].contacto+'</td> <td>'+array[i].c_puesto+'</td> <td>'+array[i].generacion+'</td> <td>'+array[i].escuela+'</td> </tr>');
			contador++;
		}
		$('#resultado').html(a_html.join(''));
		msginfo(array.length);
	}else{
		$('#resultado').html('');
		msginfo(array.length);
	}

}
function findString(search, val){
	    var re = new RegExp(val.toString());
	            if (search !== null) {
	                if (search.toString().match(re)) {
	                    return true;
	                }
	            }
	return false;
}
function msginfo(rows_number){
	if(rows_number ==0){
	$('#msg').removeClass('hidden').addClass('show');
	$('#msg-info').removeClass('show').addClass('hidden');
	}else{	
	$('#msg').removeClass('show').addClass('hidden');
	$('#msg-info').removeClass('hidden').addClass('show');
	$('#msg-info').html('<b>'+rows_number+'</b> registros encontrados.');

	}

}
/*
 * 
 * @param Array a Arreglo que se va a quitar los duplicados
 * @returns Array Regresa un areglo sin duplicados, tambien otro 
 * beneficio es que si es numerico lo devuelve ordenado y con su 
 * tipo original.
 */
function mataDuplas(a) {
    var tmp = [], i = 0, ln = a.length, res = [], type = '';
    type = typeof(a[0]);
    for (; i < ln; i++) {
        tmp[a[i]] = 1;
    }
    for (var j in tmp) {
        if (type === 'number')
            res.push(parseInt(j));
        else
            res.push(j);
    }
    return res;
}
function objarreglo(array){
	var listGiro=[];
	var listPuesto=[];
	var obj={};
	for(var i in array){
		listGiro.push(array[i].giro);
		listPuesto.push(array[i].c_puesto);
	}
	obj.giro=mataDuplas(listGiro).sort();
	obj.puesto=mataDuplas(listPuesto).sort();
	return obj;
}
function arregloPuesto(array){
	var list=[];
	for(var i in array){
		list.push(array[i].c_puesto);
	}
	return mataDuplas(list);
}

function fillOptions(array, select){
	var a_html=['<option value="">No importa</option>'];
	for(var i in array){
		a_html.push('<option value="'+array[i]+'">'+array[i]+'</option>');
	}
	$('#'+select).html(a_html.join(''));
}