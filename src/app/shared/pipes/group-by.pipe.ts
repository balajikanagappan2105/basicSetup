import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], propertys: string[]): any[] {
    // prevents the application from breaking if the array of objects doesn't exist yet

    if(!collection) {
        return null;
    }

	var helper = {};
	var arr = collection;
	var result = arr.reduce(function (r, o) {
		let key = '';
		for (let index = 0; index < propertys.length; index++) {
			key += o[propertys[index]];
			if(index != propertys.length - 1)
				key += '-'
		}
		//var key = o['ClientEventTypeId'] + '-' + o.SurveyId + '-' + o.EmployeeQuestionnaireId;

		if (!helper[key]) {
			helper[key] = [];
			helper[key].push(o);
			r.push(helper[key]);
		} else {
			helper[key].push(o);
		}

		return r;
	}, []);

    // this will return an array of objects, each object containing a group of objects
    return result;
  }
}
