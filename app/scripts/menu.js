Handlebars.registerHelper("switch", function (value, options) {
	this._switch_value_= value;
	var html=options.fn(this);
	delete this._switch_value_;
	return html;
});
 
Handlebars.registerHelper("case", function (value, options) {
	var html=options.fn(this);
	if (value==this._switch_value_) {
		return html;
	}
	
});

var menu= document.querySelector("#menu");
menu.innerHTML= ProyectoFinal.menu();

var menuItems=[
	{"item":"Costos", "state":"costos", "active":true},
	{"item":"Gastos Operacionales", "state":"gastosOperacionales", "active":false},
	{"item":"Obligaciones Laborales", "state":"obligacionesLaborales", "active":false},
	{"item":"Utilidades", "state":"utilidades", "active":false},
	{"item":"Liquidaciones", "state":"liquidaciones", "active":false}
	
];
var menuContext={menuItems};
menu.innerHTML= ProyectoFinal.menu(menuContext);

//CONTENIDO
var appContent= document.querySelector("#appContent");
appContent.innerHTML= ProyectoFinal.content();

function getStateTitle(state){
	for(var i=0; i<menuItems.length; i++){
		if (menuItems[i].state === state) {
			return menuItems[i].item;
		}
	}
}

function changeState(state){
	//cabecera del contenido, colocar el nombre de la pagina actual
	var appContentContext= {"state":state, "title":getStateTitle(state)};
	appContent.innerHTML= ProyectoFinal.content(appContentContext);

	//redireccionar a la pagina seleccionada
	var statePage= document.querySelector("#"+state);
	$(".menuLinks").removeClass("menuActive");
	$("#"+state+"Link").addClass("menuActive");
	statePage.innerHTML=ProyectoFinal[state]();

	switch(state){
		case 'gastosOperacionales':
			var tablaGO=document.querySelector("#tblGastosO");
			var dtGastosO=[
				{"clasification":"Administrativos", "concept":"Arriendo Local", "valo":1500},
				{"clasification":"Administrativos", "concept":"Nómina", "valo":100000},
				{"clasification":"Administrativos", "concept":"Servicios Publicos", "valo":400},
				{"clasification":"Administrativos", "concept":"Telefonos", "valo":750},
				{"clasification":"Administrativos", "concept":"Depreciación (muebles y enseres)", "valo":100},
				{"clasification":"Administrativos", "concept":"Depreciación (equipos de computo)", "valo":150},
				{"clasification":"Administrativos", "concept":"Otros gastos (aseo, entre otros)", "valo":50},
				{"clasification":"Ventas", "concept":"Compra material", "valo":10000}
			];
			tablaGO.innerHTML=ProyectoFinal.tablaGastosOperacionales({gastos:dtGastosO});
		break;
		
		case 'obligacionesLaborales':
			var tablaOB= document.querySelector("#tblOL");
			var datosOB= [
				{"concepto":"Asignación Familiar","porcentaje":"3.33%"},
				{"concepto":"Vacaciones","porcentaje":"1.67%"},
				{"concepto":"CTS","porcentaje":"8.33%"},
				{"concepto":"Essalud","porcentaje":"9%"},
				{"concepto":"SCTR Pension","porcentaje":"0.70%"},
				{"concepto":"SCTR Salud","porcentaje":"1%"},
			];
			tablaOB.innerHTML= ProyectoFinal.tablaOL({obligaciones:datosOB});
		break;
		case 'utilidades':
			var tablaUtilidades= document.querySelector("#tblUtilidades");
			var dtUtilidades= [
				{"concepto":"Ventas", "unitario":"S/100.00", "cantidad":"500", "total": "S/50,000.00", "periodo":"01-06-2019", "porcentaje":"100%"},
				{"concepto":"Menos: gastos operacionales", "unitario":"S/30.00", "cantidad":"500", "total":"S/15,000.00", "periodo":"01-06-2019", "porcentaje":"30%"},
				{"concepto":"Menos: costo de ventas", "unitario":"S/20.00", "cantidad":"500", "total": "S/10,000.00", "periodo":"01-06-2019", "porcentaje":"20%"}
			];
			$(document).ready(function(){
				$('.datepicker').datepicker();
			});
  
			tablaUtilidades.innerHTML= ProyectoFinal.tablaUtilidades({utilidades: dtUtilidades})	
		break;

		case 'liquidaciones':
			var tablaLiquidaciones=document.querySelector("#tblLiquidacion");
			var datosLiquidacion=[
				{"trabajador":"Gerente", "salario":"5,000.00", "auxilio":"", "comision":"", "total":"5,000.00"},
				{"trabajador":"Secretaria", "salario":"1,800.00", "auxilio":"35.00", "comision":"", "total":"1,835.00"},
				{"trabajador":"Técnico 1", "salario":"1,500.00", "auxilio":"35.00", "comision":"200.00", "total":"1,735.00"},
				{"trabajador":"Técnico 2", "salario":"1,500.00", "auxilio":"35.00", "comision":"300.00", "total":"1,835.00"},
				{"trabajador":"Supervisor", "salario":"2,500.00", "auxilio":"35.00", "comision":"", "total":"2,535"}
				];
			tablaLiquidaciones.innerHTML=ProyectoFinal.tablaliquidacion({liquidacion:datosLiquidacion});
		break;
		}
}

changeState("costos");






