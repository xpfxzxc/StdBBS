import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/topics"
  },
  {
    path: "",
    loadChildren: () =>
      import("./modules/auth/auth.module").then(mod => mod.AuthModule)
  },
  {
    path: "users",
    loadChildren: () =>
      import("./modules/users/users.module").then(mod => mod.UsersModule)
  },
  {
    path: "topics",
    loadChildren: () =>
      import("./modules/topics/topics.module").then(mod => mod.TopicsModule)
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./modules/categories/categories.module").then(
        mod => mod.CategoriesModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
      scrollPositionRestoration: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
