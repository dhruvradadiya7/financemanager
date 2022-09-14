import static org.junit.Assert.*;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.junit.Test;

public class Expenses {

	static ChromeDriver driver;
	static WebElement email, password, submit, inputDate,description,remark,amount,stgBtn,addBtn,delBtn;
	
	@BeforeClass
	public static void setup() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "/Users/rajnish/Documents/Codes/test/chromedriver100");
		driver= new ChromeDriver();
		driver.get("https://fm-cegep.vercel.app/");
		Thread.sleep(3000);
		email = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[1]/input"));
		password = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[2]/input"));
		submit = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/button"));
		email.sendKeys("testuser2@gmail.com");
		password.sendKeys("test123");
		submit.click();
		Thread.sleep(3000);
		driver.navigate().to("https://fm-cegep.vercel.app/");
	}
	
	
	@Test
	public void addExpenses() throws InterruptedException {
		Thread.sleep(3000);
		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[1]/div/button"));
		addBtn.click();
		inputDate = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[1]/input"));
		inputDate.sendKeys("2022"+Keys.ARROW_RIGHT+"02-02");
		description = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[2]/input"));
		description.sendKeys("BASMJ");
		remark = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[3]/input"));
		remark.sendKeys("EFGH");
		amount = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[4]/input"));
		amount.sendKeys("123");
		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[5]/button[1]"));
		addBtn.click();
		String validate = driver.findElement(By.xpath("//*[text()='BASMJ']")).getText();
		Assert.assertEquals("BASMJ", validate);
	}
	
//	@Test
//	public void addExpensesWithoutDate() throws InterruptedException {
//		Thread.sleep(3000);
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[1]/div/button"));
//		addBtn.click();
//		inputDate = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[1]/input"));
//		inputDate.sendKeys("");
//		description = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[2]/input"));
//		description.sendKeys("TestWithoutDate");
//		remark = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[3]/input"));
//		remark.sendKeys("TestWIthoutDate");
//		amount = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[4]/input"));
//		amount.sendKeys("123");
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[5]/button[1]"));
//		addBtn.click();
//		String validate = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[4]")).getText();
//		Assert.assertEquals("Please enter Date field to save!", validate);
//	}
	
//	@Test
//	public void addExpensesWithoutDescription() throws InterruptedException {
//		Thread.sleep(3000);
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[1]/div/button"));
//		addBtn.click();
//		inputDate = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[1]/input"));
//		inputDate.sendKeys("2022"+Keys.ARROW_RIGHT+"02-02");
//		description = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[2]/input"));
//		description.sendKeys("");
//		remark = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[3]/input"));
//		remark.sendKeys("TestWIthoutDescription");
//		amount = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[4]/input"));
//		amount.sendKeys("123");
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[5]/button[1]"));
//		addBtn.click();
//		String validate = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[4]")).getText();
//		Assert.assertEquals("Please enter Description field to save!", validate);
//	}
	
//	@Test
//	public void addExpensesWithoutAmount() throws InterruptedException {
//		Thread.sleep(3000);
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[1]/div/button"));
//		addBtn.click();
//		inputDate = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[1]/input"));
//		inputDate.sendKeys("2022"+Keys.ARROW_RIGHT+"02-02");
//		description = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[2]/input"));
//		description.sendKeys("TestWIthoutRemark");
//		remark = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[3]/input"));
//		remark.sendKeys("TestWIthoutRemark");
//		amount = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[4]/input"));
//		amount.sendKeys("");
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[5]/button[1]"));
//		addBtn.click();
//		String validate = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[4]")).getText();
//		Assert.assertEquals("Please enter Amount field to save!", validate);
//	}
	
	@Test
	public void deletingExpenses() throws InterruptedException {
		Thread.sleep(3000);
		WebElement expTab = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]"));
		Actions action = new Actions(driver);
		//Performing the mouse hover action
		action.moveToElement(expTab).perform();
		delBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[3]/div[2]/div[2]/div[5]/button[2]"));
		delBtn.click();
		Thread.sleep(1000);
		Boolean validate;
		try {
			validate = driver.findElement(By.xpath("//*[text()='BASMJ']")).isDisplayed();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			validate = false;
		}
		Assert.assertEquals(false, validate);
	}

}
