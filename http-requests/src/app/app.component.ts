import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from './services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  loading = false;
  error = null;
  postServiceSubscription: Subscription;

  constructor(private postService: PostService) {} 

  ngOnInit() {
    this.postServiceSubscription = this.postService.error.subscribe(error=> {
      this.error = error;
    });
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.loading = true;
    this.error = false;
    this.postService.fetchPosts().subscribe((posts=> {
      this.loadedPosts = posts;
      this.loading = false;
    }), (error=> {
      this.error = error;
      this.loading = false;
    }));
  }

  onClearPosts() {
    this.loading = true;
    this.postService.deleteAllPosts().subscribe(data=>{
      console.log("Response: ", data);
      this.loading = false;
      this.loadedPosts = [];
    })
  }

  ngOnDestroy() {
    this.postServiceSubscription.unsubscribe();
  }
}
