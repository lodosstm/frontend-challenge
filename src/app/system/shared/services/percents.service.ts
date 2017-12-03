import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {BaseApi} from "../../../shared/core/base-api";
import {Percents} from "../../../shared/models/percents.model";


@Injectable()
export class PercentsService extends BaseApi {
  constructor (public http: Http) {
    super(http);
  }
  getPercents(): Observable<Percents>{
    return this.get('percents');
  }
}
