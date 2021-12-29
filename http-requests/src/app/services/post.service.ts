import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<Object>();

  constructor(private http: HttpClient) {}

  createPost(postData: {title: string, content: string}) {
    this.http.post<{name: string}>("<JSON_URL_FOR_FIREBASE_OR_BACKEND_URL>", postData)
    .subscribe(data=> {
      console.log("Returned data in service: ", data);
    }, (error=> {
      this.error.next(error);
    }));
  }

  fetchPosts(){
    let requestParams = new HttpParams();
    requestParams = requestParams.set('waka', 'hehe');
    requestParams = requestParams.set('wohoo', 'yes');
    return this.http.get<{[id:string]: {content: string, title: string}}>("<JSON_URL_FOR_FIREBASE_OR_BACKEND_URL>", {
      headers: new HttpHeaders({'pretty': 'true', 'custom': 'haha'}),
      params: requestParams
    })
    .pipe(map(post=> {
      const tempArr = [];
      for(const key in post) {
        tempArr.push({...post[key], id: key});
      }
      return tempArr;
    }), catchError(err=> {
      // do some task
      console.log("errror in catchAsync: ", err);
      return throwError(err);
    }));
  }

  deleteAllPosts() {
    return this.http.delete("<JSON_URL_FOR_FIREBASE_OR_BACKEND_URL>", {
      observe: 'events',
      responseType: 'blob'
    })
    .pipe(tap(event=> {
      if(event.type == HttpEventType.Sent) {
        console.log("Sent....");
      }
      if(event.type == HttpEventType.Response) {
        console.log("recevied response....");
      }
    }));
  }

}
