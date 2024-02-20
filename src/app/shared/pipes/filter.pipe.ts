import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
	pure: false
})

export class FilterPipe implements PipeTransform {
    transform(array, property1, value1, property2?, value2?, property3?, value3?, property4?, value4?) {

        if (property4 && value4) {
            return array.filter(item => { return item[property1] == value1 && item[property2] == value2 && item[property3] == value3 && item[property4] == value4; })
        } else if (property3 && value3) {
            return array.filter(item => { return item[property1] == value1 && item[property2] == value2 && item[property3] == value3; })
        } else if (property2 && value2) {
            return array.filter(item => { return item[property1] == value1 && item[property2] == value2; })
        } else {
            return array.filter(item => { return item[property1] == value1; })
        }
    }
}
