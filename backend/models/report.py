from dataclasses import dataclass
from utils.db.query_executor import AsyncQueryExecutor
import json
from datetime import datetime


class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)


@dataclass
class HouseholdContact:
    id: int = None
    report_id: int = None
    name: str = None
    age: int = None
    disposition: str = None
    date: str = None
    
    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO house_hold_contacts (
                report_id, name, age, disposition, date
            ) VALUES (%s, %s, %s, %s, %s)
        """
        await query_executor.execute(query, (
            self.report_id, self.name, self.age, self.disposition, self.date
        ))
        return self
    
    @staticmethod
    async def get_contacts_by_report_id(report_id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM house_hold_contacts WHERE report_id = {report_id}"
        results = await query_executor.fetch_all(query)
        if results:
            return [HouseholdContact(
                id=result[0],
                report_id=result[1],
                name=result[2],
                age=result[3],
                disposition=result[4],
                date=format_date_with_suffix(result[5]) if len(result) > 5 else None
            ) for result in results]
        return []


@dataclass
class OtherContact:
    id: int = None
    report_id: int = None
    name: str = None
    age: int = None
    disposition: str = None
    date: str = None
    
    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO other_contacts (
                report_id, name, age, disposition, date
            ) VALUES (%s, %s, %s, %s, %s)
        """
        await query_executor.execute(query, (
            self.report_id, self.name, self.age, self.disposition, self.date
        ))
        return self
    
    @staticmethod
    async def get_contacts_by_report_id(report_id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM other_contacts WHERE report_id = {report_id}"
        results = await query_executor.fetch_all(query)
        if results:
            return [OtherContact(
                id=result[0],
                report_id=result[1],
                name=result[2],
                age=result[3],
                disposition=result[4],
                date=format_date_with_suffix(result[5]) if len(result) > 5 else None
            ) for result in results]
        return []


@dataclass
class Report:
    id: int = None
    ethnicGroup: str = None
    dischargeDate: str = None
    isolationDateFrom: str = None
    isolationDateTo: str = None
    movementHistory: str = None
    isolationStatus: str = None
    outcome: str = None
    labResults: str = None
    householdContacts: str = None
    otherContacts: str = None
    phiRemarks: str = None
    file: str = None
    reportCreatedDate: str = None

    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO report (
                ethnicGroup, dischargeDate, isolationDateFrom, isolationDateTo,
                movementHistory, isolationStatus, outcome, labResults,
                householdContacts, otherContacts, phiRemarks, file, reportCreatedDate
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        await query_executor.execute(query, (
            self.ethnicGroup, self.dischargeDate, self.isolationDateFrom,
            self.isolationDateTo, self.movementHistory, self.isolationStatus,
            self.outcome, self.labResults, None,
            None, self.phiRemarks, self.file, self.reportCreatedDate
        ))
        
        # Get the last inserted ID
        query_executor1 = AsyncQueryExecutor()
        result = await query_executor1.fetch_one("SELECT id FROM report ORDER BY id DESC LIMIT 1")
        self.id = result[0]
        
        # Process and save household contacts
        if self.householdContacts:
            try:
                household_contacts_data = json.loads(self.householdContacts) if isinstance(self.householdContacts, str) else self.householdContacts
                for contact_data in household_contacts_data:
                    # Make sure date is a string
                    date = contact_data.get('date')
                    if isinstance(date, datetime):
                        date = date.strftime('%Y-%m-%d')
                    
                    contact = HouseholdContact(
                        report_id=self.id,
                        name=contact_data.get('name'),
                        age=contact_data.get('age'),
                        disposition=contact_data.get('disposition'),
                        date=date
                    )
                    await contact.save()
            except Exception as e:
                print(f"Error saving household contacts: {str(e)}")
                # Handle JSON and other errors
                pass
        
        # Process and save other contacts
        if self.otherContacts:
            try:
                other_contacts_data = json.loads(self.otherContacts) if isinstance(self.otherContacts, str) else self.otherContacts
                for contact_data in other_contacts_data:
                    # Make sure date is a string
                    date = contact_data.get('date')
                    if isinstance(date, datetime):
                        date = date.strftime('%Y-%m-%d')
                        
                    contact = OtherContact(
                        report_id=self.id,
                        name=contact_data.get('name'),
                        age=contact_data.get('age'),
                        disposition=contact_data.get('disposition'),
                        date=date
                    )
                    await contact.save()
            except Exception as e:
                print(f"Error saving other contacts: {str(e)}")
                # Handle JSON and other errors
                pass
                
        return self

    @staticmethod
    async def get_report_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM report WHERE id = {id}"
        result = await query_executor.fetch_one(query)

        if result:
            res = Report(
                id=result[0],
                ethnicGroup=result[1],
                dischargeDate=result[2],
                isolationDateFrom=result[3],
                isolationDateTo=result[4],
                movementHistory=result[5],
                isolationStatus=result[6],
                outcome=result[7],
                labResults=result[8],
                householdContacts=result[9],
                otherContacts=result[10],
                phiRemarks=result[11],
                file=result[12],
                reportCreatedDate=result[13]
            )

            if res.dischargeDate:
                res.dischargeDate = format_date_with_suffix(res.dischargeDate)

            if res.isolationDateFrom:
                res.isolationDateFrom = format_date_with_suffix(res.isolationDateFrom)

            if res.isolationDateTo:
                res.isolationDateTo = format_date_with_suffix(res.isolationDateTo)

            if res.reportCreatedDate:
                res.reportCreatedDate = format_date_with_suffix(res.reportCreatedDate)
                
            # Get household contacts
            household_contacts = await HouseholdContact.get_contacts_by_report_id(res.id)
            if household_contacts:
                contacts_data = []
                for contact in household_contacts:
                    contacts_data.append({
                        'name': contact.name,
                        'age': contact.age,
                        'disposition': contact.disposition,
                        'date': contact.date
                    })
                res.householdContacts = contacts_data
                
            # Get other contacts
            other_contacts = await OtherContact.get_contacts_by_report_id(res.id)
            if other_contacts:
                contacts_data = []
                for contact in other_contacts:
                    contacts_data.append({
                        'name': contact.name,
                        'age': contact.age,
                        'disposition': contact.disposition,
                        'date': contact.date
                    })
                res.otherContacts = contacts_data

            return res

        return None

    @staticmethod
    async def get_all_reports():
        query_executor = AsyncQueryExecutor()
        query = "SELECT id FROM report"
        results = await query_executor.fetch_all(query)
        return [await Report.get_report_by_id(result[0]) for result in results] if results else []

    async def update(self):
        query_executor = AsyncQueryExecutor()
        query = """
            UPDATE report SET 
                ethnicGroup = %s,
                dischargeDate = %s,
                isolationDateFrom = %s,
                isolationDateTo = %s,
                movementHistory = %s,
                isolationStatus = %s,
                outcome = %s,
                labResults = %s,
                householdContacts = %s,
                otherContacts = %s,
                phiRemarks = %s,
                file = %s,
                reportCreatedDate = %s
            WHERE id = %s
        """
        await query_executor.execute(query, (
            self.ethnicGroup, self.dischargeDate, self.isolationDateFrom,
            self.isolationDateTo, self.movementHistory, self.isolationStatus,
            self.outcome, self.labResults, self.householdContacts,
            self.otherContacts, self.phiRemarks, self.file, self.reportCreatedDate,
            self.id
        ))
        
        # Delete existing contacts
        delete_query1 = f"DELETE FROM house_hold_contacts WHERE report_id = {self.id}"
        delete_query2 = f"DELETE FROM other_contacts WHERE report_id = {self.id}"
        await query_executor.execute(delete_query1)
        await query_executor.execute(delete_query2)
        
        # Process and save household contacts
        if self.householdContacts:
            try:
                household_contacts_data = json.loads(self.householdContacts) if isinstance(self.householdContacts, str) else self.householdContacts
                for contact_data in household_contacts_data:
                    # Make sure date is a string
                    date = contact_data.get('date')
                    if isinstance(date, datetime):
                        date = date.strftime('%Y-%m-%d')
                        
                    contact = HouseholdContact(
                        report_id=self.id,
                        name=contact_data.get('name'),
                        age=contact_data.get('age'),
                        disposition=contact_data.get('disposition'),
                        date=date
                    )
                    await contact.save()
            except Exception as e:
                print(f"Error updating household contacts: {str(e)}")
                # Handle JSON and other errors
                pass
        
        # Process and save other contacts
        if self.otherContacts:
            try:
                other_contacts_data = json.loads(self.otherContacts) if isinstance(self.otherContacts, str) else self.otherContacts
                for contact_data in other_contacts_data:
                    # Make sure date is a string
                    date = contact_data.get('date')
                    if isinstance(date, datetime):
                        date = date.strftime('%Y-%m-%d')
                        
                    contact = OtherContact(
                        report_id=self.id,
                        name=contact_data.get('name'),
                        age=contact_data.get('age'),
                        disposition=contact_data.get('disposition'),
                        date=date
                    )
                    await contact.save()
            except Exception as e:
                print(f"Error updating other contacts: {str(e)}")
                # Handle JSON and other errors
                pass
                
        return self 
    

def format_date_with_suffix(date_obj):
    day = date_obj.day
    # Get suffix
    if 10 <= day % 100 <= 20:
        suffix = 'th'
    else:
        suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')
    
    # Format the final string
    return f"{day}{suffix} {date_obj.strftime('%b')} {date_obj.year}"
