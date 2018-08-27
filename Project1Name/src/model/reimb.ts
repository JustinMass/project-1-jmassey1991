
export class Reimb {
  reimb_id = 0;
  reimb_submitted = '';
  reimb_resolved = '';
  reimb_description = '';
  reimb_receipt = '';
  reimb_author = 0;
  reimb_resolver = 0;
  reimb_status = '';
  reimb_type = '';
  reimb_amount = 1;
  

  constructor(id?: number, submitted?: string, resolved?: string, description?: string, receipt?: string, author?: number, resolver?: number, status?: string, type?: string, amount?: number ) {
    id && (this.reimb_id = id);
    submitted && (this.reimb_submitted = submitted);
    resolved && (this.reimb_resolved = resolved);
    description && (this.reimb_description = description);
    receipt && (this.reimb_receipt = receipt);
    author && (this.reimb_author = author);
    resolver && (this.reimb_resolver = resolver);
    status && (this.reimb_status = status);
    type && (this.reimb_type = type);
    amount && (this.reimb_amount = amount);
    
  }
}