import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * When doing abstract, we enable this mixing to be used in abstract classes as well.
 */
type AbstractConstructor = abstract new (...args: any[]) => Record<string, unknown>;

/**
 * Add support to automatic handling of unsubscriptions. All subscriptions
 * added to `this.subscriptions.add()` will be automatically unsubscribed
 * when Angular lifecycle `ngOnDestroy` is invoked.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function WithSubscribe<T extends AbstractConstructor>(Base: T = class {} as any) {
  @Directive()
  abstract class SubscribeMixinClass extends Base implements OnDestroy {
    /**
     * Component subscriptions managed by the base mixin.
     *
     * @memberof WithSubscribe
     */
    subscriptions: Subscription = new Subscription();

    /**
     * @override
     */
    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }
  }

  return SubscribeMixinClass;
}
