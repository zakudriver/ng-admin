import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTOR } from '@app/core/interceptors';

@NgModule({
  imports  : [HttpClientModule],
  exports  : [HttpClientModule],
  providers: [HTTP_INTERCEPTOR]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`,
      );
    }
  }
}
