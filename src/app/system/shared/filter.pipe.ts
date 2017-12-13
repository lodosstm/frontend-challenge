import {Pipe, PipeTransform} from '@angular/core';
import {Skill} from '../../shared/models/skill.module';

@Pipe ({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(value: any, args: Skill): any {
    const filter = args[0];
    return filter ? value.filter(skill => skill.skillName.indexOf(filter) !== -1) : value;
  }
}
