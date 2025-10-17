export function SiteFooter() {
  return (
    <footer className="border-t bg-white" id="contact">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">ONLINE UNIVERSAL MART</h3>
          <p className="mt-2 text-sm text-muted-foreground">Premium Ittar delivered across Pakistan. Cash on Delivery available.</p>
        </div>
        <div>
          <h4 className="font-medium">Contact</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>WhatsApp: <a className="text-primary underline" href="https://wa.me/923332385779" target="_blank" rel="noreferrer">0333 2385779</a></li>
            <li>Facebook: <a className="text-primary underline" href="https://www.facebook.com/profile.php?id=61572891727401" target="_blank" rel="noreferrer">Follow us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Delivery</h4>
          <p className="mt-2 text-sm text-muted-foreground">Flat delivery fee PKR 250 nationwide. Pay via Cash on Delivery.</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} ONLINE UNIVERSAL MART. All rights reserved.</div>
    </footer>
  );
}
