import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Skill} from '../../../shared/models/skill.module';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class MockSkillsService {
  constructor () { }
  public skills: Skill;

  public getSkill(idskill: number): Observable<Skill> {
    return Observable.of({
      skillName: 'skill',
      id: idskill});
  }

  public getSkillByName(name: string) {
    return {
      skillName: name,
      id: 1};
  }

  public createNewSkill(skill: Skill) {
    return {
      skillName: 'skill',
      id: 1};
  }

  public getAllSkills(): Observable<Skill> {
    return Observable.of({
      skillName: 'skill',
        id: 1},
      );
  }

  public Skills() { }
}
